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