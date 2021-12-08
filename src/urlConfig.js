export const api = `${process.env.REACT_APP_API}/api`;

export const generatePublicUrl = (fileName) => {
    return `${process.env.REACT_APP_API}/public/${fileName}`
}

// console.log(`${process.env.REACT_APP_API}`)