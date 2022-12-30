import app from './server'

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})