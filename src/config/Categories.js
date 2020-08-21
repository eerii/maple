const categories = [
    "A-Arts-#f33e7b",
    "C-Crafts and:Home-#f85a56",
    "K-Cooking-#ee8649",
    "S-Help with:School-#ffc825",
    "M-Music and:Movies-#5ABD5D",
    "L-Language:Learning-#3926c6",
    "F-Fitness-#2a45e3",
    "Mf-Mindfulness-#2e8bf8",
    "J-Just for:Fun-#29bbff",
    "T-Technology-#5cddb8"
]

export const getCategories = () => {
    const codes = categories.map(a => a.split("-")[0])
    const names = categories.map(a => a.split("-")[1])
    const colors = categories.map(a => a.split("-")[2])
    return [codes, names, colors]
}