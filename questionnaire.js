
// common libs
const restify = require('restify')

// the questions
const QUESTIONS = [
    'what is the answer to 42 ?',
    'what is the age of the capitain ?'
]

// the answers given by users
const ANSWERS = [{prof: 'the meaning of life'}, {prof: 'blue'}]
const VALIDATIONS = [{prof: true}, {prof: true}]

// create and configure the server
var server = restify.createServer()
server.pre(restify.plugins.pre.userAgentConnection())
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

// --- QUESTIONS API ---

// GET a question
server.get('/questions/:id', (req, res, next)=>{
    res.json({
        question: QUESTIONS[req.params.id]
    })
    next()
})

// GET all the questions
server.get('/questions', (req, res, next)=>{
    res.json({
        questions: QUESTIONS
    })
    next()
})

// --- ANSWERS API ---

// POST the answer given by a user
server.post('/questions/:id/answers/:user', (req, res, next)=>{
    ANSWERS[req.params.id][req.params.user] = req.body.answer
    res.json({
        question: QUESTIONS[req.params.id],
        user: req.params.user,
        answer: ANSWERS[req.params.id][req.params.user],
    })
    next()
})

// GET the answer given by a user
server.get('/questions/:id/answers/:user', (req, res, next)=>{
    res.json({
        question: QUESTIONS[req.params.id],
        user: req.params.user,
        answer: ANSWERS[req.params.id][req.params.user],
    })
    next()
})

// GET all the answers
server.get('/questions/:id/answers', (req, res, next)=>{
    res.json({
        question: QUESTIONS[req.params.id],
        answers: ANSWERS[req.params.id]})
    next()
})

// --- VALIDATION API ---

// POST the validation of an answer given by a user
server.post('/questions/:id/answers/:user/validation', (req, res, next)=>{
    VALIDATIONS[req.params.id][req.params.user] = req.body.validation
    res.json({
        question: QUESTIONS[req.params.id],
        user: req.params.user,
        answer: ANSWERS[req.params.id][req.params.user],
        validation: VALIDATIONS[req.params.id][req.params.user]
    })
    next()
})

// GET the validation of an answer given by a user
server.get('/questions/:id/answers/:user/validation', (req, res, next)=>{
    res.json({
        question: QUESTIONS[req.params.id],
        user: req.params.user,
        answer: ANSWERS[req.params.id][req.params.user],
        validation: VALIDATIONS[req.params.id][req.params.user]
    })
    next()
})

// -----------------------

// start the server
server.listen(process.env.PORT || 8183, function() {
  console.log('%s listening at %s', server.user, server.url)
})