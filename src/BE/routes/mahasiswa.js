const express = require('express')
const router = express.Router();
const db =require('../db');

//1. read, ambil mahasiswa
// endpoint GET /api/mahasiswa

router.get('/',(req ,res) =>{
    db.query('SELECT id_mhs, nama_mhs, nim_mhs, semester_mhs FROM mahasiswa WHERE role = ?',
        ['mahasiswa'],(err, result) =>{
            if(err) return res.status(500).json({error: err.message});
            res.json(result);
        });
});

// 2. create tambah data mahasiswa
// endpoint POST /api/mahasiswa

router.post('/', (req, res)=>{
    const {nama,nim,semester}= req.body;

    db.query(
        'INSERT INTO mahasiswa (nama_mhs,nim_mhs,semester_mhs,role) VALUES (?,?,?,?)',
        [nama, nim, semester,'mahasiswa'],
        (err,result)=>{
            if(err){
                return res.status(500).json({error: err.message});
            }
            res.status(201).json({id: result.insertId})
        }
    );
});

// 3. UPDATE ubah data mahasiswa dari nim
// endpoint PUT /api/mahasiswa/:nim
router.put('/:nim', (req, res)=>{
    const {nim} = req.params;
    const {nama, semester}= req.body;

db.query(
    'UPDATE mahasiswa SET nama_mhs=?, semester_mhs=? WHERE nim_mhs = ? AND role =?',
    [nama,semester,nim,'mahasiswa'],
    (err, result)=>{
        //jka eror
        if(err){
            return res.status(500).json({error: err.message})
        }
        //jika nim tdk di temukan
        if(result.affectedRows == 0){
            return res.status(404).json({message:'mahasiswa tidak di temukan'});
        }
        //jika suskes
        res.json({success:true})
    }
);
});

// 4.delete hapus data mahasiswa dari nim
// emdpoint DELETE /api/mahasiswa/:nim
router.delete('/:n', (req, res)=>{
    const {nim} =req.params;

    db.query(
        'DELETE FROM mahasiswa WHERE nim_mhs = ? AND role =?',
        [nim, 'mahasiswa'],
        (err, result)=>{
            if(err){
                return res.status(500).json({error: err.message});
            }
            if(result.affectedRows === 0){
                return res.status(404).json({message:'mahasiswa tidak di temukan'})
            }
            res.sendStatus(204);
        }
    );
});

module.exports = router;
