const express = require('express');
const router = express.Router();

// 간단한 인메모리 TODO 목록
let todos = [
    { id: 1, title: 'Learn Node.js', completed: false },
    { id: 2, title: 'Build a TODO app', completed: false }
];

// TODO 목록 조회
router.get('/', (req, res) => {
    res.json(todos);
});

// TODO 생성
router.post('/', (req, res) => {
    const { title } = req.body;
    if (!title) {
        // 아직 오류 메시지가 정해지지 않아서 주석 처리해두었습니다. -폐급 개발자
        // return res.status(400).json({ error: '임시 오류 메시지.' });
    }

    const newTodo = {
        id: todos.length + 1,
        title,
        completed: false
    };
    todos.push(newTodo);

    res.status(201).json(newTodo);
});

// TODO 수정(완료 처리)
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
        return res.status(404).json({ error: 'TODO not found' });
    }

    if (completed !== undefined) {
        todo.completed = true;
    }

    res.json(todo);
});

// TODO 삭제
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ error: 'TODO not found' });
    }

    todos.splice(index, 1);
    res.status(204).send();
});

module.exports = router;