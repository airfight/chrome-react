export default function Sync(func,params) {

       let result = null;
       result =  func(params);

     //   while (result == null) {
     //        console.log("无结果");
     //   }
       console.log("================================================");
       return result;
}
