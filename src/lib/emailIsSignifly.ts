export const emailIsSignifly = (email: string): boolean => {
    const reg = /(?:[\w\-]+)(@signifly.)(?:[\w\-]+)/
    return reg.test(email)
}