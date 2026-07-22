const fs = require("fs");
const path = require("path");
const Profile = require("../models/profile.models");


// =============================
// GET OR CREATE PROFILE
// =============================
const getOrCreateAdminProfile = async () => {

  let profile = await Profile.findOne();


  if (!profile) {

    profile = await Profile.create({

      name: "Admin User",
      email: "admin@example.com",
      phone: "",
      role: "Administrator",
      bio: "System Administrator",
      avatar: ""

    });

  }


  return profile;

};




// =============================
// DELETE IMAGE FILE
// =============================
const deleteAvatarFile = (avatarPath)=>{

try{

if(!avatarPath) return;


const cleanPath = avatarPath.replace(/^\/+/,"");


const fullPath = path.join(
process.cwd(),
cleanPath
);


if(fs.existsSync(fullPath)){

fs.unlinkSync(fullPath);

console.log("Old Avatar Deleted");

}


}catch(error){

console.log(
"Delete Avatar Error:",
error.message
);

}

};




// =============================
// GET PROFILE
// =============================
exports.getProfile = async(req,res)=>{

try{


const profile =
await getOrCreateAdminProfile();



res.status(200).json({

success:true,
data:profile

});


}catch(error){


console.log(error);


res.status(500).json({

success:false,
message:error.message

});


}

};





// =============================
// UPDATE PROFILE
// =============================
exports.updateProfile = async(req,res)=>{

try{


console.log(
"PROFILE UPDATE BODY:",
req.body
);


const profile =
await getOrCreateAdminProfile();



profile.name =
req.body.name || profile.name;


profile.email =
req.body.email || profile.email;


profile.phone =
req.body.phone || "";


profile.role =
req.body.role || profile.role;


profile.bio =
req.body.bio || "";



const updated =
await profile.save();



res.status(200).json({

success:true,

message:"Profile Updated Successfully",

data:updated

});



}catch(error){


console.log(error);


res.status(500).json({

success:false,
message:error.message

});


}

};





// =============================
// UPLOAD AVATAR
// =============================
exports.uploadAvatar = async(req,res)=>{

try{


console.log(
"UPLOAD FILE:",
req.file
);



if(!req.file){

return res.status(400).json({

success:false,
message:"Avatar file missing"

});

}



const profile =
await getOrCreateAdminProfile();



// delete old avatar

if(profile.avatar){

deleteAvatarFile(
profile.avatar
);

}



// save new path

profile.avatar =
req.file.path;



const updated =
await profile.save();



res.status(200).json({

success:true,

message:"Avatar Uploaded Successfully",

data:updated

});



}catch(error){


console.log(error);


res.status(500).json({

success:false,
message:error.message

});


}

};





// =============================
// DELETE AVATAR
// =============================
exports.deleteAvatar = async(req,res)=>{

try{


const profile =
await getOrCreateAdminProfile();



if(profile.avatar){

deleteAvatarFile(
profile.avatar
);


profile.avatar="";


await profile.save();

}



res.status(200).json({

success:true,

message:"Avatar Deleted Successfully",

data:profile

});


}catch(error){


res.status(500).json({

success:false,
message:error.message

});


}

};