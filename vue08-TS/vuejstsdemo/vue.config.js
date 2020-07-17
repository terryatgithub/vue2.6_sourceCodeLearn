module.exports = {
    devServer: {
        before(app) {
            app.get('/api/list', (req, res) => {
                res.json([
                    { id: 1, name: 'type annotate', selected: true },
                    { id: 2, name: 'type inference', selected: false }
                ])
            })
        }
    }
}