import bcrypt from "bcryptjs"
const users=[
    {
        name:"John Doe",
        email:"testuser@example.com",
        password:bcrypt.hashSync("123456",10),
        isAdmin:true
    },
    {
        name:"Sallu Bhai",
        email:"selmonbhai@example.com",
        password:bcrypt.hashSync("123456",10),
    },
    {
        name:"McLovin",
        email:"mclovin@example.com",
        password:bcrypt.hashSync("123456",10),
    }
]

export default users