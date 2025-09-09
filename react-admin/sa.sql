-- 查询 "01"课程比"02"课程成绩高的学生的信息及课程分数
select distinct d.SId, d.Sname, d.Sage, d.Ssex, c.CId, c.score1, c.score2 from Student d inner join 
(select a.SId, a.CId, a.score score1, b.score score2 from SC a
inner join SC b
on a.SId = b.SId
where a.CId = "01" and b.CId = "02" and a.score > b.score) c
on c.SId = d.SId;

-- 查询同时存在" 01 "课程和" 02 "课程的情况
select * from SC a 
inner join SC b
on a.SId = b.SId 
where 
a.SId = b.SId
and
a.CId = '01' 
and a.score is not null 
and b.CId = '02' 
and b.score is not null;

-- 查询存在"01"课程但可能不存在"02"课程的情况(不存在时显示为 null)

-- 查询不存在"01"课程但存在"02"课程的情况
select distinct * from SC a inner join
(select SId from SC
where SId not in 
(select distinct SId from SC where SC.CId = '01')) b
on b.Sid =a.SId;

-- 查询平均成绩大于等于60分的同学的学生编号，姓名和平均成绩
select a.Sid, a.Sname, b.avg_score from Student a inner join 
(select sid,avg(score) as avg_score
from SC
group by Sid
HAVING  avg(score) > 60) b on a.Sid = b.Sid;

-- 查询在sc表存在成绩的学生信息
select * from Student a inner join
(select DISTINCT SC.Sid from SC) b ON a.Sid = b.Sid;

-- 查询所有同学的学生编号，学生姓名，选课总数，所有课程总成绩(没成绩显示为null)
select a.Sid, a.Sname, b.counts, b.scores from Student a left join 

(select Sid, count(Sid) as counts,sum(score) as scores from SC group by Sid) b

on a.Sid = b.Sid;

--查询李姓老师的数量
select count(*) from Teacher where Tname like '李%';

-- 查询学过张三老师授课的同学信息
select e.Sid, e.Sname, e.Sage, e.Ssex from Student e right join
(select C.Sid from SC c right join
(select a.Cid from Course a right join 
(select Tid from Teacher where Tname = '张三') b
on a.Tid = b.Tid) d
on c.Cid = d.Cid) f
on e.Sid = f.Sid;

-- 查询和'01'号同学学习的课程完全相同的其它同学的信息
select * from SC c right join
(select a.Cid from SC a right join 
(select Sid from Student where Sid = '01') b
on a.Sid = b.Sid) d
on c.Cid = d.Cid;

-- 查询没有学过"张三"老师任意一门课程的学生信息

-- 查询两门课及以上不及格课程的同学的学号，姓名以及平均成绩

-- 检索"01"课程分数小于60，按分数降序排列的学生信息
select a.Sid, a.Sname, a.Sage, a.Ssex, b.score from Student a right join
(select Sid, score from SC where Cid = '01' and score < 60 order by score desc) b
on a.Sid = b.Sid;

-- 按平均成绩从高到低显示所有学生的所有课程的成绩以及平均成绩

select s.Sid, s.Sname, s.Sage, s.Ssex, f.score_avg from Student s left join
(select a.Sid, a.Cid, a.score, b.score_avg from SC a right join
(select Sid,AVG(score) as score_avg from SC group by Sid order by score_avg desc ) b
on a.Sid = b.Sid) f
on s.Sid = f.Sid order by f.score_avg desc 
;

-- 查询各科成绩最高分、最低分和平均分：以如下形式显示：课程 ID，课程 name，最高分，最低分，平均分，及格率，中等率，优良率，优秀率 及格为>=60，中等为：70-80，优良为：80-90，优秀为：>=90 要求输出课程号和选修人数，查询结果按人数降序排列，若人数相同，按课程号升序排列.


-- 按各科成绩进行排序，并显示排名， score 重复时保留名次空缺使用mysql的变量。
-- 按各科成绩进行排序，并显示排名， Score 重复时合并名次
-- 查询学生的总成绩，并进行排名，总分重复时保留名次空缺
-- 统计各科成绩各分数段人数：课程编号，课程名称，[100-85) ，[85-70)，[70-60)，[60-0]及所占百分比

-- 查询各科成绩前三名的记录


-- 查询每门课程被选修的学生数
select Cid,COUNT(Cid) from SC group by Cid;

-- 查询出只选修两门课程的学生学号和姓名
select a.Sid, a.Sname from Student a right join 
(select Sid from SC group by Sid having Count(Sid) = 2) b
on a.Sid = b.Sid;

-- 查询男生女生人数
select count(Ssex) from Student group by Ssex;

-- 查询名字中含有「风」字的学生信息
select * from Student where Sname like '%风%';

-- 查询同名同性学生名单，并统计同名人数
select t1.Sname, t1.Ssex from Student t1 inner join 
(select * from Student) t2 on  t1.Sid != t2.Sid and t1.Sname = t2.Sname;

-- 查询 1990 年出生的学生名单
select * from Student where year(Sage) = 1990;

-- 查询每门课程的平均成绩，结果按平均成绩降序排列，平均成绩相同时，按课程编号升序排列

select Cid, AVG(score) as avage_score from SC group by Cid order by avage_score  desc,  Cid ASC ;

-- 查询平均成绩大于等于 85 的所有学生的学号、姓名和平均成绩
select *  from Student a right join
(select Sid, AVG(score) as avage_score from SC group by Sid having avage_score >= 85) b
on a.Sid = b.Sid;

-- 查询课程名称为「数学」，且分数低于 60 的学生姓名和分数
select t3.Sname, t4.score from Student t3 right join
(select t1.* from SC t1 right join
(select Cid from Course where Cname = '数学') t2
on t1.Cid = t2.Cid where t1.score < 60) t4
on t3.Sid = t4.Sid;

--  查询所有学生的课程及分数情况（存在学生没成绩，没选课的情况）
select * from Student t1 left join
(select * from SC ) t2 on t1.Sid = t2.Sid;

-- 查询任何一门课程成绩在 70 分以上的姓名、课程名称和分数
select t3.Sname, t4.Cname, t4.score from Student t3 left join
(select t2.Sid, t1.Cname, t2.score from Course t1 left join
(select * from SC where score > 70) t2
on t1.Cid = t2.Cid) t4 
on t3.Sid = t4.Sid where score > 70;


-- 查询不及格的课程
SELECT distinct cid
FROM SC
WHERE score<60;


