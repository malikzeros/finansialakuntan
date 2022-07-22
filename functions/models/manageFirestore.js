const db = require("./firestore");
const showData= async (params)=>{
  const user = db.collection(params);
  const data = await user.get();
  return data;
}
const addData=()=>{

}
const updateData=()=>{}
const deleteData=()=>{} 
module.exports ={
  showData,
  addData,
  updateData,
  deleteData
};