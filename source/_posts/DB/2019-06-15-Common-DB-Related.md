---
title: 常用 DataBase 相关操作和资源
date: 2019-06-15 18:00:00
categories: Coding
tags: [DB, Postgres, SQL]
---

记录一些常用的 DataBase 相关的东西。

- 查询
- 权限
- 备份
- 读写

<!--more-->

## 查询

```sql
-- 查询所有的 schema
select schema_name from information_schema.schemata;
select nspname from pg_catalog.pg_namespace;
```

## 权限

```sql
--- 创建 Read-Only 用户
GRANT CONNECT ON DATABASE [db_name] TO [user_name];
GRANT USAGE ON SCHEMA public TO [user_name];
-- special table
GRANT SELECT ON [table_name] TO [user_name];
-- all tables
GRANT SELECT ON ALL TABLES IN SCHEMA public TO [user_name];
-- grant access to the new tables automatically
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO [user_name];

-- 创建正常用户
CREATE USER [user_name] WITH PASSWORD 'xxxxxxx';
-- only public schema
GRANT ALL PRIVILEGES ON DATABASE [db_name] TO [user_name];
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO [use_rname];
```

## 备份

```bash
### psql dump ###
pg_dump -h [host] -Fc -o -U [user_name] [db_name] > backup.dump
sudo -u postgres pg_restore -C [backup.dump]
# Example
pg_dump -h 67.8.78.10 -Fc -o -U myuser mydb > mydb_backup.dump
pg_restore -h 67.8.78.10 -p 5432 -d mydb -U myuser mydb_backup.dump

### psql sql ###
pg_dump -h [host] -U [user_name] [db_name] > mydb_backup.sql
psql -h host -d mydb -U myuser -p 5432 -a -q -f mydb_backup.sql
-h PostgreSQL server IP address
-d database name
-U user name
-p port which PostgreSQL server is listening on
-f path to SQL script
-a all echo
-q quiet 
-f file

// complete (all db and objects)
pg_dumpall -U myuser -h 67.8.78.10 --clean --file=backup.dump
// restore from pg_dumpall --clean
psql -f backup.dump postgres #it doesn't matter which db you select here


### mysql ###
mysqldump --host [host] -P [port] -u [user_name] -p[password] [db_name] > backup.sql
# Example
mysqldump --host 192.168.1.15 -P 3306 -u myuser -pmypassword mydb > mydb.sql
```

## 读写

```bash
# 从文件中写入 DB
psql -h host -d db_name -U bi -p port -c "\copy table (col1,col2,...coln) FROM '/path/to/data.txt' with delimiter as '|'"
```

## 编码

[mysql - What's the difference between utf8\_general\_ci and utf8\_unicode\_ci - Stack Overflow](https://stackoverflow.com/questions/766809/whats-the-difference-between-utf8-general-ci-and-utf8-unicode-ci)

[collation - What is the impact of LC\_CTYPE on a PostgreSQL database? - Database Administrators Stack Exchange](https://dba.stackexchange.com/questions/94887/what-is-the-impact-of-lc-ctype-on-a-postgresql-database)

[Creating a UTF-8 Database](https://support.helpspot.com/index.php?pg=kb.page&id=467)

[UTF8 Postgresql Create Database Like MySQL (including character set, encoding, and lc_type) - Stack Overflow](https://stackoverflow.com/questions/9961795/utf8-postgresql-create-database-like-mysql-including-character-set-encoding-a)

[How to fix a locale setting warning from Perl? - Stack Overflow](https://stackoverflow.com/questions/2499794/how-to-fix-a-locale-setting-warning-from-perl)

## 资源

- 非常好的学习和查询资料
    - [PostgreSQL Tutorial - Learn PostgreSQL from Scratch](http://www.postgresqltutorial.com/)
- 不错的 ORM 工具
    - [peewee — peewee 3.9.6 documentation](http://docs.peewee-orm.com/en/latest/index.html)
- CMD
    - [MySQL Commands](http://g2pc1.bu.edu/~qzpeng/manual/MySQL%20Commands.htm)
- SQL
    - [SQL Server SELECT INTO Table Create - SQLUSA](http://sqlusa.com/bestpractices/select-into/)
- 其他一些资料
    - [Psycopg – PostgreSQL database adapter for Python — Psycopg 2.8.3.dev0 documentation](http://initd.org/psycopg/docs/index.html)
    - [Python PostgreSQL Tutorial Using Psycopg2 [Complete Guide]](https://pynative.com/python-postgresql-tutorial/)

## 参考

- 权限
    - [PostgreSQL - How to create a read-only user? | TablePlus](https://tableplus.io/blog/2018/04/postgresql-how-to-create-read-only-user.html)
    - [PostgreSQL: Grant/Revoke Privileges](https://www.techonthenet.com/postgresql/grant_revoke.php)
- 备份
    - [postgresql - pg_dump postgres database from remote server - Stack Overflow](https://stackoverflow.com/questions/29648309/pg-dump-postgres-database-from-remote-server)
    - [How to backup MySQL database on a remote server? - Stack Overflow](https://stackoverflow.com/questions/19552150/how-to-backup-mysql-database-on-a-remote-server)