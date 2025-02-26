import { Router } from 'express';
const router = Router();
// import { protect, authorize } from '../middleware/auth.js';
import { addBanner, getBanners, updateBanner, deleteBanner } from '../controllers/bannerController.js';
import upload from '../Middleware/uploadimg.js';

router.post('/add', upload.single('image'), addBanner);//authorize('admin', 'superadmin'),
router.get('/get', getBanners);
router.put('/:id',  updateBanner);//authorize('admin', 'superadmin'),
router.delete('/:id', deleteBanner);// authorize('admin', 'superadmin'),

export default router; 