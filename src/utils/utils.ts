// export const isMobile = (UA: string) => {
//   if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(UA) ) {
//     // some code..
//     return true;
//    } else {
//      return false;
//    }
// }
export function isMobile2(UA: string) {
  if(/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(UA) ) {
    // some code..
    return true;
   } else {
     return false;
   }
}
