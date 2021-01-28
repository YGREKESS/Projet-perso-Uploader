import express from 'express';
import multer from "multer";
import fs from "fs";
import path from 'path';
import Post from './models/Post'
import File from './models/File';
import archiver from 'archiver';
import qs from 'qs';
import uniqid from 'uniqid';
import nodemailer from "nodemailer";

const router = express.Router();

// File store config
const storageDir = path.join(__dirname, './', 'storage')
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storageDir)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storageConfig })

//upload rooting
router.post('/upload', upload.array("files"), async (req, res) => {
    const filesReq = req.files;
    let files = [];
    for (let i = 0; i < filesReq.length; i++) {
        const file = new File({
            name : filesReq[i].filename,
            originalname: filesReq[i].originalname,
            mimetype: filesReq[i].mimetype,
            size: filesReq[i].size,
        })
        files.push(file)
    }
    try {
        const savedFiles = await File.insertMany(files);
        const post = new Post({
            to: req.body.to,
            from: req.body.from,
            message: req.body.message,
            files: savedFiles
        })
        const savedPost = await post.save();

        return res.status(200).json({
            post: savedPost,
            files: savedFiles
        });
    } catch (error) {
        return res.status(400).json({
            error: {
                message: "Le fichier n'a pas pu être sauvegardé."
            }
        })
    }
})

router.post('/sendemail', async (req, res) => {
    const id = req.body.id;
    const to = req.body.to;
    const from = req.body.from;
    const message = req.body.message; 
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
        user: "", // generated ethereal user
        pass: "", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: from, // sender address
        to: to, // list of receivers
        subject: "Un fichier vous a été envoyé.", // Subject line
        text: `Quelqu'un vous a envoyé un/des fichier(s), voici le lien pour les récupérer : http://localhost:3000/download/${id}`, // plain text body
        html: `Bonjour, <br> 
        Quelqu'un vous a envoyé des fichiers, voici le lien pour les récupérer : https://localhost:3000/download/${id}. <br><br>
        Votre correspond à egalement souhaité vous adresser ce message : <br>
        "${message}", <br><br>
        A bientôt !`, // html body
    });
    console.log("Message sent")
        
})

//download rooting
router.get('/download/:id', async (req, res) => {
    const queryArrayId = qs.parse(req.params.id);
    const ids = queryArrayId.id;
    const folderId = uniqid();
    let imgs = []
    try {
        if (ids.length === 1) {
            const file = await File.find({ _id: ids[0] }, (error, res) => {
                if (error) {
                    return res.status(404).json({
                        error: {
                            message: "File not found 1"
                        }
                    })
                }
            })
            if (file) {
                const fileName = String(file[0].name);
                const filePath = path.join(storageDir, fileName);
                res.download(filePath, fileName, (error) => {
                    if (error) {
                        return res.status(404).json({
                            error: {
                                message: "Error during download"
                            }
                        })
                    }
                })
            }        
        } else {
            for (let i = 0; i < ids.length; i++) {
                const file = await File.find({ _id: ids[i] }, (error, res) => {
                    if (error) {
                        return res.status(404).json({
                            error: {
                                message: "Files not found"
                            }
                        })
                    }   
                })
                imgs.push(file[0]) 
            }
            const output = fs.createWriteStream(__dirname + `/storage/${folderId}.zip`);
            const zip = archiver("zip");

            output.on('close', function () {
                const filePath = path.join(storageDir, `${folderId}.zip`);
                console.log(zip.pointer() + ' total bytes');
                console.log('archiver has been finalized and the output file descriptor has closed.');
                res.download(filePath, `${folderId}.zip`, (error) => {
                    if (error) {
                        return res.status(404).json({
                            error: {
                                message: "Error during download"
                            }
                        })
                    }
                })
            });
            zip.pipe(output);
            for (let i = 0; i < imgs.length; i++) {
                const file = __dirname + '/storage/' + imgs[i].name;
                zip.append(fs.createReadStream(file), { name: imgs[i].originalname });
            }
            zip.finalize();
        }
    } catch (error) {
        return res.status(404).json({
            error: {
                message: "File not found"
            }
        })
    }

})

//Recup files from post
router.get('/post/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.find({ _id: postId }, (error, res) => {
            if (error) {
                return res.status(404).json({
                    error: {
                        message: "Post not found 1"
                    }
                })
            }
        })
        if (post) {
            return res.status(200).send(post)
        }
    } catch (error) {
        return res.status(404).json({
            error: {
                message: "Post not found"
            }
        })
    }
})

export default router;
