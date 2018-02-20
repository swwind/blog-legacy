layout: page
title: code
date: 2017-05-05 14:09:36
tags:
---


# 前言

突然觉得如果在博客里放一个方便复制粘贴的模板页面就好了、、、
于是这个页面就诞生了、、、
正在慢慢加。

# 模板类

## 高精度
```cpp
struct huge{
	#define N_huge 1505
	#define base 100000000
	static char s[N_huge*10];
	typedef long long value;
	value a[N_huge];int len;
	void clear(){len=1;a[len]=0;}
	huge(){clear();}
	huge(value x){*this=x;}
	huge operator =(huge b){
		len=b.len;for (int i=1;i<=len;++i)a[i]=b.a[i]; return *this;
	}
	huge operator +(huge b){
		int L=len>b.len?len:b.len;huge tmp;
		for (int i=1;i<=L+1;++i)tmp.a[i]=0;
		for (int i=1;i<=L;++i){
			if (i>len)tmp.a[i]+=b.a[i];
			else if (i>b.len)tmp.a[i]+=a[i];
			else {
				tmp.a[i]+=a[i]+b.a[i];
				if (tmp.a[i]>=base){
					tmp.a[i]-=base;++tmp.a[i+1];
				}
			}
		}
		if (tmp.a[L+1])tmp.len=L+1;
			else tmp.len=L;
		return tmp;
	}
	huge operator -(huge b){
		int L=len>b.len?len:b.len;huge tmp;
		for (int i=1;i<=L+1;++i)tmp.a[i]=0;
		for (int i=1;i<=L;++i){
			if (i>b.len)b.a[i]=0;
			tmp.a[i]+=a[i]-b.a[i];
			if (tmp.a[i]<0){
				tmp.a[i]+=base;--tmp.a[i+1];
			}
		}
		while (L>1&&!tmp.a[L])--L;
		tmp.len=L;
		return tmp;
	}
	huge operator *(const huge &b){
		int L=len+b.len;huge tmp;
		for (int i=1;i<=L;++i)tmp.a[i]=0;
		register value *Tmp=tmp.a;
		const register value *B=b.a;
		for (register int j=1;j<=b.len;++j)
			for (register int i=1;i<=len;++i)
				Tmp[i+j-1]+=a[i]*B[j];
		tmp.len=len+b.len;
		for (int i=1;i<tmp.len;++i)
			if (tmp.a[i]>=base){
				tmp.a[i+1]+=tmp.a[i]/base;
				tmp.a[i]%=base;
			}
		while (tmp.len>1&&!tmp.a[tmp.len])--tmp.len;
		return tmp;
	}
	pair<huge,huge> divide(huge a,huge b){
		int L=a.len;huge c,d;
		for (int i=L;i;--i){
			c.a[i]=0;d=d*base;d.a[1]=a.a[i];
			int l=0,r=base-1,mid;
			while (l<r){
				mid=(l+r+1)>>1;
				if (b*mid<=d)l=mid;
					else r=mid-1;
			}
			c.a[i]=l;d-=b*l;
		}
		while (L>1&&!c.a[L])--L;c.len=L;
		return make_pair(c,d);
	}
	huge operator /(value x){
		value d=0;huge tmp;
		for (int i=len;i;--i){
			d=d*base+a[i];
			tmp.a[i]=d/x;d%=x;
		}
		tmp.len=len;
		while (tmp.len>1&&!tmp.a[tmp.len])--tmp.len;
		return tmp;
	}
	value operator %(value x){
		value d=0;
		for (int i=len;i;--i)d=(d*base+a[i])%x;
		return d;
	}
	huge operator /(huge b){return divide(*this,b).first;}
	huge operator %(huge b){return divide(*this,b).second;}
	huge &operator +=(huge b){*this=*this+b;return *this;}
	huge &operator -=(huge b){*this=*this-b;return *this;}
	huge &operator *=(huge b){*this=*this*b;return *this;}
	huge &operator ++(){huge T;T=1;*this=*this+T;return *this;}
	huge &operator --(){huge T;T=1;*this=*this-T;return *this;}
	huge operator ++(int){huge T,tmp=*this;T=1;*this=*this+T;return tmp;}
	huge operator --(int){huge T,tmp=*this;T=1;*this=*this-T;return tmp;}
	huge operator +(value x){huge T;T=x;return *this+T;}
	huge operator -(value x){huge T;T=x;return *this-T;}
	huge operator *(value x){huge T;T=x;return *this*T;}
	huge operator *=(value x){*this=*this*x;return *this;}
	huge operator +=(value x){*this=*this+x;return *this;}
	huge operator -=(value x){*this=*this-x;return *this;}
	huge operator /=(value x){*this=*this/x;return *this;}
	huge operator %=(value x){*this=*this%x;return *this;}
	bool operator ==(value x){huge T;T=x;return *this==T;}
	bool operator !=(value x){huge T;T=x;return *this!=T;}
	bool operator <=(value x){huge T;T=x;return *this<=T;}
	bool operator >=(value x){huge T;T=x;return *this>=T;}
	bool operator <(value x){huge T;T=x;return *this<T;}
	bool operator >(value x){huge T;T=x;return *this>T;}
	huge operator =(value x){
		len=0;
		while (x)a[++len]=x%base,x/=base;
		if (!len)a[++len]=0;
		return *this;
	}
	bool operator <(huge b){
		if (len<b.len)return 1;
		if (len>b.len)return 0;
		for (int i=len;i;--i){
			if (a[i]<b.a[i])return 1;
			if (a[i]>b.a[i])return 0;
		}
		return 0;
	}
	bool operator ==(huge b){
		if (len!=b.len)return 0;
		for (int i=len;i;--i)
			if (a[i]!=b.a[i])return 0;
		return 1;
	}
	bool operator !=(huge b){return !(*this==b);}
	bool operator >(huge b){return !(*this<b||*this==b);}
	bool operator <=(huge b){return (*this<b)||(*this==b);}
	bool operator >=(huge b){return (*this>b)||(*this==b);}
	huge str(char s[]){
		int l=strlen(s);value x=0,y=1;len=0;
		for (int i=l-1;i>=0;--i){
			x=x+(s[i]-'0')*y;y*=10;
			if (y==base)a[++len]=x,x=0,y=1;
		}
		if (!len||x)a[++len]=x;
	}
	void read(){
		scanf("%s",s);this->str(s);
	}
	void print(){
		printf("%d",(int)a[len]);
		for (int i=len-1;i;--i){
			for (int j=base/10;j>=10;j/=10){
				if (a[i]<j)printf("0");
					else break;
			}
			printf("%d",(int)a[i]);
		}
		printf("\n");
	}
};char huge::s[N_huge*10];
```

## 矩阵
```cpp
struct Matrix{
	#define MSZ 3
	int num[MSZ][MSZ];
	void clear(){memset(num, 0, sizeof num);}
	Matrix(){clear();}
	Matrix(bool flag){clear();for(int i = 0; i < MSZ; i++)num[i][i]=1;}
	int* operator [] (int &i) {return num[i];}
	friend Matrix operator * (Matrix &a, Matrix &b){
		Matrix c;
		for(int k = 0; k < MSZ; k++)
			for(int i = 0; i < MSZ; i++) if(a[i][k])
				for(int j = 0; j < MSZ; j++) if(b[k][j])
					c[i][j] = (c[i][j]+a[i][k]*b[k][j])%mod;
		return c;
	}
	friend Matrix operator ^ (Matrix a, ll b){
		Matrix c(true);
		for(;b;b/=2,a=a*a)if(b&1)c=c*a;
		return c;
	}
};
```

## zhzh大佬的IO优化
```cpp
class FileInputStream{private:static const size_t defaultBufsz=1e6;FILE *stream;size_t bufsz;char *buf,*p;bool good;void fetch(){if(!buf) p = buf = new char [bufsz+1];size_t sz = fread(buf,1,bufsz,stream);p = buf; buf[sz] = '\0';good = sz;}char nextchar(){if(!*p) fetch();return *p++;}template<typename Int>void readint(Int& x){char c;for(c=nextchar();isspace(c);c=nextchar());x = 0;Int sign = 1;if(c=='-')sign = -1, c = nextchar();for(;isdigit(c);c = nextchar()) x=x*10+c-'0';x*=sign;}public:FileInputStream():stream(NULL),bufsz(defaultBufsz),buf(NULL),p(NULL),good(false){}explicit FileInputStream(const std::string& filename,size_t bufsz=defaultBufsz):stream(fopen(filename.c_str(),"r")),bufsz(bufsz),buf(NULL),p(NULL),good(false){fetch();}explicit FileInputStream(FILE *stream,size_t bufsz=defaultBufsz):stream(stream),bufsz(bufsz),buf(NULL),p(NULL),good(false){fetch();}bool close(){return !fclose(stream);}~FileInputStream(){close();delete [] buf;}operator bool()const{return good;}bool operator!()const{return !good;}bool open(const std::string& filename,size_t bufsz=defaultBufsz){stream=fopen(filename.c_str(),"r");this->bufsz=bufsz;fetch();return stream;}bool open(FILE *stream,size_t bufsz=defaultBufsz){this->stream=stream;this->bufsz=bufsz;fetch();return stream;}FileInputStream& operator>>(short& value){readint(value);return *this;}FileInputStream& operator>>(unsigned short& value){readint(value);return *this;}FileInputStream& operator>>(int& value){readint(value);return *this;}FileInputStream& operator>>(unsigned int& value){readint(value);return *this;}FileInputStream& operator>>(long& value){readint(value);return *this;}FileInputStream& operator>>(unsigned long& value){readint(value);return *this;}FileInputStream& operator>>(long long& value){readint(value);return *this;}FileInputStream& operator>>(unsigned long long& value){readint(value);return *this;}FileInputStream& operator>>(char& c){for(c=nextchar();isspace(c);c=nextchar());return *this;}FileInputStream& operator>>(std::string& s){char c;for(c=nextchar();isspace(c);c=nextchar());s.clear();for(;good&&!isspace(c);c=nextchar())s+=c;return *this;}friend FileInputStream& getline(FileInputStream& is,std::string& s,char delim='\n');};FileInputStream& getline(FileInputStream& is,std::string& s,char delim){char c;s.clear();for(c=is.nextchar();is.good&&c!=delim;c=is.nextchar())s+=c;return is;}
class FileOutputStream{private:static const size_t defaultBufsz=1e6;FILE *stream;size_t bufsz;char *buf,*p,dig[25];public:FileOutputStream():stream(NULL),bufsz(defaultBufsz),buf(NULL),p(NULL){}explicit FileOutputStream(const std::string& filename,size_t bufsz=defaultBufsz):stream(fopen(filename.c_str(),"w")),bufsz(bufsz),buf(new char [bufsz]),p(buf){}explicit FileOutputStream(FILE *stream,size_t bufsz=defaultBufsz):stream(stream),bufsz(bufsz),buf(new char [bufsz]),p(buf){}bool close(){return !fclose(stream);}void flush(){fwrite(buf,1,p-buf,stream);p=buf;}private:void writechar(char c){*p++=c;if(p==buf+bufsz)flush();}template<typename Int>void writeint(Int x){if(x<0)writechar('-'),x=-x;int len=0;do dig[++len]=x%10;while(x/=10);for(;len;len--)writechar(dig[len]+'0');}public:~FileOutputStream(){flush();close();delete [] buf;}bool open(const std::string& filename,size_t bufsz=defaultBufsz){stream=fopen(filename.c_str(),"w");this->bufsz=bufsz;delete [] buf;p=buf=new char [bufsz];return stream;}bool open(FILE *stream,size_t bufsz=defaultBufsz){this->stream=stream;this->bufsz=bufsz;delete [] buf;p=buf=new char [bufsz];return stream;}FileOutputStream& operator <<(short value){writeint(value);return *this;}FileOutputStream& operator <<(unsigned short value){writeint(value);return *this;}FileOutputStream& operator <<(int value){writeint(value);return *this;}FileOutputStream& operator <<(unsigned int value){writeint(value);return *this;}FileOutputStream& operator <<(long value){writeint(value);return *this;}FileOutputStream& operator <<(unsigned long value){writeint(value);return *this;}FileOutputStream& operator <<(long long value){writeint(value);return *this;}FileOutputStream& operator <<(unsigned long long value){writeint(value);return *this;}FileOutputStream& operator <<(char c){writechar(c);return *this;}FileOutputStream& operator <<(const std::string& s){for(size_t i=0;i<s.length();i++)writechar(s[i]);return *this;}FileOutputStream& operator <<(FileOutputStream& (*func)(FileOutputStream&)){return func(*this);}friend FileOutputStream& endl(FileOutputStream& os);};FileOutputStream& endl(FileOutputStream& os){os.writechar('\n');return os;}
```

# 模板方法

## 读入输出优化
```cpp
inline int read(){
	int x=0,f=0;char ch=getchar();
	while(ch>'9'||ch<'0'){if(ch=='-')f=1;ch=getchar();}
	while(ch<='9'&&ch>='0'){x=(x<<3)+(x<<1)+ch-'0';ch=getchar();}
	return f?-x:x;
}
inline void write(int x){
	if(x > 9) write(x/10);
	putchar(x%10);
}
inline void writeln(int x){
	write(x); puts("");
}
```

# 其他

## 佛祖
```cpp
///////////////////////////////////////////////////////////////////
//                            _ooOoo_                            //
//                           o8888888o                           //
//                           88" . "88                           //
//                           (| ^_^ |)                           //
//                           O\  =  /O                           //
//                        ____/`---'\____                        //
//                      .'  \\|     |//  `.                      //
//                     /  \\|||  :  |||//  \                     //
//                    /  _||||| -:- |||||-  \                    //
//                    |   | \\\  -  /// |   |                    //
//                    | \_|  ''\---/''  |   |                    //
//                    \  .-\__  `-`  ___/-. /                    //
//                  ___`. .'  /--.--\  `. . ___                  //
//               ."" '<  `.___\_<|>_/___.'  >'"".                //
//              | | :  `- \`.;`\ _ /`;.`/ - ` : | |              //
//              \  \ `-.   \_ __\ /__ _/   .-` /  /              //
//       ========`-.____`-.___\_____/___.-`____.-'========       //
//                            `=---='                            //
//       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^       //
//                     佛祖保佑      RP++                        //
///////////////////////////////////////////////////////////////////
```

## 关同步
```cpp
ios::sync_with_stdio(false);
```

## 头文件
```cpp
#include <cstdio>
#include <iostream>
#include <cstdlib>
#include <cmath>
#include <cstring>
#include <algorithm>
#include <ctime>
#include <map>
#include <queue>
#include <vector>
```