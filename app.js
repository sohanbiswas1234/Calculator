var express=require('express')
var fs=require('fs')
var history=require('./history.json')

var app=express()

var mp = {
    "plus" : '+',
    "minus" : '-',
    "into" : '*',
    "by" : '/',
    "mod" : '%'
};


app.get('/',(req,res)=>{
    res.send("HEMLLO, KEM CHO ?")
})

app.get('/history',(req,res)=>{
    arr=[]
    history.forEach(ele => {
        arr.push({
            "question":ele["question"],
            "answer":ele["answer"]
        })
    });
    res.send(arr)
})

app.get('*',(req,res)=>{
    try {        
        var arr = req.url.split('/');
        var expr = arr[1];
        for(var i=2;i<arr.length;i+=2)
        expr += mp[arr[i]]+arr[i+1];
        var ans = eval(expr);
        ans = String(ans);
        console.log(ans)
        var resp={
            "question":expr,
            "answer":ans
        }
        history.push(resp)
        fs.writeFile('./history.json',JSON.stringify(history),err=>{
            if(err) throw err;
            console.log(`History Added Succcessfully`)
            res.send(resp)
        })

    } catch (err) {
        console.log(err);
    }
})
app.listen(200,console.log("Server => 200"))