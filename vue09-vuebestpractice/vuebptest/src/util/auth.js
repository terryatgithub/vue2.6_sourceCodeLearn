const userList = ['admin', 'terry', 'travaller']


//登录返回用户token
export function login(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userList.includes(username)) {
                console.log('login success');
                const token = +new Date()
                resolve(token)
            } else {
                console.log('login fail');
                reject(false)
            }
        }, 0)
    })
}