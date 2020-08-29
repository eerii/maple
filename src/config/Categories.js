const categories = [
    "A-Arts and:Crafts-#f6457b",
    "O-Home-#f85353",
    "K-Cooking-#ff7f38",
    "L-Learn-#ffa433",
    "G-Languages-#55ca58",
    "T-Technology-#39c19f",
    "C-Consulting-#2eadf1",
    "H-Health-#5190fa",
    "P-Parenthood-#908bff",
    "J-Just for:Fun-#bd82ef"
]

/*const newColors = ["#f6457b", "#f85353", "#ff7f38", "#ffa433",
                "#55ca58", "#39c19f", "#2eadf1", "#5190fa",
                "#908bff", "#bd82efS"]*/

export const getCategories = () => {
    const codes = categories.map(a => a.split("-")[0])
    const names = categories.map(a => a.split("-")[1])
    const colors = categories.map(a => a.split("-")[2])
    return [codes, names, colors]
}