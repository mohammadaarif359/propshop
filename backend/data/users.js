import bcrypt from "bcryptjs";
const users = [
    {
        name:"Admin Proshop",
        email:"admin@proshop.com",
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:"Aarif Proshop",
        email:"aarif@proshop.com",
        password:bcrypt.hashSync('123456',10)
    },
    {
        name:"Ravi Proshop",
        email:"ravi@proshop.com",
        password:bcrypt.hashSync('123456',10)
    }
]
export default users;