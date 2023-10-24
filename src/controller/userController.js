

const Utils = require("../Utils/utils");
const UserService = require("../service/userService");
const chat = require("../model/chatModel")


module.exports = class UserController{


    static async userUpdate(req,res,next){
        try{
           const userData = req.body;
           const resData =await UserService.userUpdate(userData);
            res.send(resData)
        }catch(err){
          next(err)
        }
    }
    static async userLogin(req,res,next){
        try{
             let userData = req.user;
            // console.log(" userData",userData)
              const checkPassword = await Utils.checkPassword(req.body.password,userData.password);
             // console.log(" checkPassword",checkPassword)
             if(checkPassword){
                const token =await Utils.generate(userData);
                console.log(" token",token)
                const resData = {
                    status:200,
                    token,
                    data:userData,
                    message:"user login successfully"
                }
               res.send(resData)
             }else{
                const err = {
                    status:400,
                    message:"Invalid password"
                }
                next(err)
             }
           
        }catch(err){
            next(err)
        };
    }

    static async getSingleChatMessage(req,res,next){
        try{
            const chatMesage = await chat.find(req.body);
           let sendRes;
           if(chatMesage.length>0){
            sendRes = {
              status:200,
               data:chatMesage,
              message:"all message "
            }
           }else{
            sendRes = {
              status:500,
              message:"some technocal problem"
            }
        }
            res.send(sendRes)
           
        }catch(err){
            next(err)
        }
    }

   static async sendMessage(req,res,next){
     try{
      const messageData = req.body;
      const resData =await UserService.sendMessage(messageData);
      res.send(resData)
      
     }catch(err){
        next(err)
     }
   }


    static async userDelete(req,res,next){
        try{
           const userId = req.params.id;
           const resData =await UserService.userDelete(userId);
            res.send(resData)

        }catch(err){
            next(err)
        }
    }

    static async userList(req,res,next){
        try{
            const pages = req.params.pages;
            const userId = req.params.userId
            const resData =await UserService.userList(pages,userId);
            res.send(resData)
        }catch(err){
            next(err);
        }
    }


    static async register(req,res,next){
        try{
            let userData = req.body;
            userData['password'] = await Utils.hashPassword(userData.password)
            const resData =await UserService.register(userData);
            res.send(resData)
        }catch(err){
            next(err)
        };
    }

    
}