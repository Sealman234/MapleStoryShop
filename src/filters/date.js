// 將取得的 timestamp 轉成可讀的時間
// => 建立 Date 物件再使用 toLocaleDateString 方法
export default function(time){
  const date = new Date(time * 1000); // 因為一般 timestamp 取得的是秒數，但要帶入的是毫秒，所以要乘 1000
  return date.toLocaleDateString(); // "2019/1/14"
}
