import { useEffect, useState } from "react";
import "./index.scss";
import avatar1 from '@/assets/images/1.png'
import avatar2 from '@/assets/images/2.png'
import avatar3 from '@/assets/images/3.png'
import avatar4 from '@/assets/images/4.png'

export default function DaySchedule() {
  const [users, setUsers] = useState( [
    {
      avatar: avatar1,
      name: "Tom",
      id: 1,
      code: "00001825",
      department: "IT",
      time: null,
    },
    {
      avatar: avatar2,
      name: "Beer",
      id: 2,
      code: "00001826",
      department: "IT",
      time: null,
    },
    {
      avatar: avatar3,
      name: "Biden",
      id: 3,
      code: "00001827",
      department: "IT",
      time: null,
    },
    {
      avatar: avatar4,
      name: "Lory",
      id: 4,
      code: "00001828",
      department: "IT",
      time: null,
    },
    {
      avatar: avatar1,
      id: 5,
      name: "Mike",
      code: "00001829",
      department: "IT",
      time: null,
    },
  ])
  const [userId, setUserId] = useState(null)
  const init = () => {
    let userId = null
    const element = document.querySelector(".DaySchedule");
    element?.addEventListener('dragstart', (event: Event) => {
      event.dataTransfer.effectAllowed = event.target?.dataset?.effect;
      userId = event?.target?.dataset?.id;
    })
    // element?.addEventListener("dragenter", (event: Event) => {
    //   console.log("dragenter", event);
    // });
    element?.addEventListener("dragover", (event: Event) => {
      event?.preventDefault && event?.preventDefault();
    });
    element?.addEventListener("drop", (event: Event) => {
      const time = event?.target?.dataset?.time;
      const newUsers = users?.map((item) => {
        console.log("sdddddd", item, userId);
        if (item?.id == userId) {
          
          item.time = time;
         }
         return item
      });
      setUsers([...newUsers]);
      console.log('sss', users)
    });
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <section draggable={true} className="DaySchedule">
      <div draggable={true} data-time={null} className="select-pannel">
        {users?.map((user, index) => {
          return user?.time == null ? <Card user={user} key={user.id} /> : null;
        })}
      </div>
      <div draggable={true} className="schedule-table">
        <table
          width="100%"
          bgcolor="#cccccc"
          className="tabtop"
          align="center"
          draggable={true}
          cellSpacing="1"
          cellPadding="4"
          border={0}
        >
          <thead>
            <tr>
              <th align="center">2025-12-30排班申请表</th>
            </tr>
          </thead>
          <tbody draggable={true}>
            <tr>
              <td className="font-center titfont">时间</td>
              <td className="font-center titfont">人员</td>
            </tr>
            <tr draggable={true}>
              <td className=" font-center titfont">
                <div>上午</div>
                (08:00 ~ 10:00)
              </td>
              <td
                draggable={true}
                data-time={8}
                className="font-center titfont active-cell"
              >
                {users?.map((item) => {
                  return item?.time == 8 ? (
                    <Card user={item} key={item.id} />
                  ) : null;
                })}
              </td>
            </tr>
            <tr draggable={true}>
              <td className=" font-center titfont">
                <div>上午</div>
                (10:00 ~ 12:00)
              </td>
              <td
                draggable={true}
                data-time={10}
                className="font-center titfont active-cell"
              >
                {users?.map((item) => {
                  return item?.time == 10 ? (
                    <Card user={item} key={item.id} />
                  ) : null;
                })}
              </td>
            </tr>
            <tr>
              <td colSpan={6}> </td>
            </tr>
            <tr draggable={true}>
              <td className="font-center titfont">
                <div>下午</div>
                <span>(13:00 ~ 15:00)</span>
              </td>
              <td
                draggable={true}
                data-time={13}
                className="font-center titfont active-cell"
              >
                {users?.map((item) => {
                  return item?.time == 13 ? (
                    <Card user={item} key={item.id} />
                  ) : null;
                })}
              </td>
            </tr>
            <tr draggable={true}>
              <td className="font-center titfont">
                <div>下午</div>
                <span>(15:00 ~ 17:00)</span>
              </td>
              <td
                draggable={true}
                data-time={15}
                className="font-center titfont active-cell"
              >
                {users?.map((item) => {
                  return item?.time == 15 ? (
                    <Card user={item} key={item.id} />
                  ) : null;
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}


const Card = (props: any) => {
  const {user}= props
  return (
    <div
      draggable="true"
      data-effect="copy"
      className="UserCard"
      data-id={user?.id}
    >
      <div className="user-avatar">
        <img draggable={ false} src={user?.avatar} alt="" />
      </div>
      <div className="user-info">
        <div className="info user-name">{user?.name}</div>
        <div className="info user-code">{user?.code}</div>
        <div className="info user-dapartment">{user?.department}</div>
      </div>
    </div>
  );
}