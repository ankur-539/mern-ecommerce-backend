import mymodel from "../schema/myschema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const mycontrol = async (req, res) => {
    res.send("welcome to external control");
};

export const procontrol = async (req, res) => {
    res.send("product");
};

export const user = async (req, res) => {
    const all = await mymodel.find();

    res.status(200).json({
        data: all
    });
};

export const userragistor = async (req, res) => {
    const {
        username,
        pass,
        userphone,
        profileurl,
        dob,
        emailid,
        gender,
        role
    } = req.body;

    const dcrptpass = bcrypt.hashSync(pass, 8);

    if (username == "") {
        return res.status(200).json({
            msg: "username is required",
            mystatus: 420
        });
    }

    const cpyemail = await mymodel.findOne({
        emailid: emailid
    });

    if (cpyemail) {
        return res.status(200).json({
            msg: "Already exist",
            mystatus: 430
        });
    }

    const newdata = await mymodel.insertOne({
        username,
        pass: dcrptpass,
        userphone,
        profileurl,
        dob,
        emailid,
        gender,
        role
    });

    return res.status(200).json({
        msg: "new user added",
        user: newdata,
        mystatus: 250
    });
};

export const userlogin = async (req, res) => {
    const { emailid, pass } = req.body;

    if (!pass && !emailid) {
        return res.status(250).json({
            msg: "Email and Pass is required",
            mystatus: 260
        });
    }

    if (!emailid) {
        return res.status(250).json({
            msg: "Email is required",
            mystatus: 270
        });
    }

    if (!pass) {
        return res.status(250).json({
            msg: "Password is required",
            mystatus: 280
        });
    }

    try {
        const checkEmail = await mymodel.findOne({
            emailid: emailid
        });

        if (!checkEmail) {
            return res.status(404).json({
                msg: "User not found",
                mystatus: 430
            });
        }

        const isMatch = await bcrypt.compare(
            pass,
            checkEmail.pass
        );

        if (!isMatch) {
            return res.status(400).json({
                msg: "Wrong password",
                mystatus: 433
            });
        }

        const token = jwt.sign(
            {
                email: checkEmail.emailid
            },
            process.env.MY_KEY,
            {
                expiresIn: "1d"
            }
        );

        return res.status(200).json({
            msg: "Login successful",
            mystatus: 200,
            token: token,
            uemail: checkEmail.emailid
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: "Server error",
            mystatus: 500
        });
    }
};

export const userdelete = async (req, res) => {
    const id = req.params.id;

    await mymodel.findByIdAndDelete({
        _id: id
    });

    res.status(200).json({
        msg: "user deleted",
        mystatus: 512
    });
};

export const userprev = async (req, res) => {
    const id = req.params.id;

    const prevdata = await mymodel.findById(id);

    res.status(200).json({
        data: prevdata
    });
};

export const useredit = async (req, res) => {
    const id = req.params.id;

    const edituser = await mymodel.findOne({
        _id: id
    });

    res.status(200).json({
        msg: "matched",
        mystatus: 450,
        user: edituser
    });
};

export const userupdate = async (req, res) => {
    const id = req.params.id;

    const updatedUser = await mymodel.findByIdAndUpdate(
        id,
        req.body,
        {
            new: true
        }
    );

    res.status(200).json({
        msg: "User updated",
        data: updatedUser
    });
};