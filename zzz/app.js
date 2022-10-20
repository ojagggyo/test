

const sleep = (m) => {
    return new Promise((resolve) => setTimeout(resolve, m));
};
  


 async function 非同期処理() {
    console.log("タイマー開始") 
    await sleep(1000);
    console.log("タイマー終了")
    return Promise.resolve(1)
}

async function main() {
    console.log("aaa") 
    console.log(1 + 非同期処理()) // 1[object Promise]
    console.log("bbb") 
    console.log(1 + await 非同期処理()) // 2
    console.log("ccc") 
}

main();
