import express, { Router } from 'express';

const router = express.Router();

class RouterService {
	public router = router;

	public bind(f: Router) {
		this.router.use('/', f);
	}
}

export default new RouterService();
