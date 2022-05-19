import { Router } from 'express';
var router = Router();

router.get('/health', (req, res) => {
    res.status(200).json({ ok: 1 });
});

export default router;
