import { mygroup } from "../models/models.mygroup";

const endTermGroup = ["20110352", "20110403", "20110123"]
function getMyGroup(req, res) {
    console.log(req.method, req.url);
    return res.json(mygroup);
}

function addGroupMember(req, res) {
    console.log(req.method, req.url);
    const id = req.params.id
    const checkMemberExist = mygroup.find((item) => item.id === id)
    const checkMygroupMember = endTermGroup.find((item) => item === id)
    if (checkMygroupMember && !checkMemberExist) {
        mygroup.push({ id: id })
        res.json(mygroup)
    }
    else res.json({ error: "Not valid" });

}

function getMyGroupById(req, res) {
    const id = req.params.id
    const result = mygroup.find((item) => item.id === id)
    console.log(req.method, req.url);
    if (result)
        res.json(result);
    else res.json({ error: "not valid" });
}

function getNameById(req, res) {
    const id = req.params.id
    const result = mygroup.find((item) => item.id === id)
    console.log(req.method, req.url);
    if (result) {
        res.send(`<html><body><ul><li>${result.name}</li></ul></body></html>`);
    }
    else if (mygroup.length > 0) {
        const result = String(mygroup.map((item) => { return (`<html><body><ul><li>${item.name}</li></ul></body></html>`) }))
        res.send(result)
    }
    else res.send(`<html><body><ul><li>Not valid</li></ul></body></html>`);

}
module.exports = {
    getMyGroup,
    addGroupMember,
    getMyGroupById,
    getNameById
}