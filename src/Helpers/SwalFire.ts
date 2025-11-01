// import Swal from "sweetalert2"; 
// export const swalFire=(title:any,text:any,type:any)=>{
//   Swal.fire({
//     title ,
//     text ,
//     icon: type
//   });
//  }

import Swal from "sweetalert2";

export const swalFire = (
  title: string,
  text: string,
  type: "success" | "error" | "warning" | "info" | "question" = "success"
) => {
  return Swal.fire({
    title,
    text,
    icon: type,
    confirmButtonColor:
      type === "warning" || type === "question" ? "#3085d6" : "#4CAF50",
    cancelButtonColor: "#d33",
    showCancelButton: type === "warning" || type === "question", 
  });
};
