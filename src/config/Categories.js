const categories = [
    "A-Arts-#f6457b",
    "C-Crafts and:Home-#f85353",
    "K-Cooking-#ff7f38",
    "S-Help with:School-#ffa433",
    "M-Music and:Movies-#55ca58",
    "L-Language:Learning-#39c19f",
    "F-Fitness-#2eadf1",
    "Mf-Mindfulness-#5190fa",
    "J-Just for:Fun-#837df8",
    "T-Technology-#9f76ea"
]

/*const newColors = ["#f6457b", "#f85353", "#ff7f38", "#ffa433",
                "#55ca58", "#39c19f", "#2eadf1", "#5190fa",
                "#837df8", "#9f76ea"]*/

export const getCategories = () => {
    const codes = categories.map(a => a.split("-")[0])
    const names = categories.map(a => a.split("-")[1])
    const colors = categories.map(a => a.split("-")[2])
    return [codes, names, colors]
}