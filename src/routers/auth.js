// import { Router } from 'express';
// import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import {
//   registerUserSchema,
//   loginUserSchema,
//   sendResetEmailSchema,
//   resetPasswordSchema,
//   loginWithGoogleOAuthSchema,
// } from '../validation/auth.js';
// import { validateBody } from '../middlewares/validateBody.js';
// import {
//   loginUserController,
//   logoutUserController,
//   refreshUserSessionController,
//   sendResetEmailController,
//   resetPasswordController,
//   registerUserController,
//   getGoogleOAuthUrlController,
//   loginWithGoogleController,
// } from '../controllers/auth.js';

// const router = Router();

// router.post(
//   '/register',
//   validateBody(registerUserSchema),
//   ctrlWrapper(registerUserController),
// );

// router.post(
//   '/login',
//   validateBody(loginUserSchema),
//   ctrlWrapper(loginUserController),
// );

// router.post('/logout', ctrlWrapper(logoutUserController));

// router.post('/refresh', ctrlWrapper(refreshUserSessionController));

// router.post(
//   '/send-reset-email',
//   validateBody(sendResetEmailSchema),
//   ctrlWrapper(sendResetEmailController),
// );
// router.post(
//   '/reset-pwd',
//   validateBody(resetPasswordSchema),
//   ctrlWrapper(resetPasswordController),
// );
// router.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

// router.post(
//   '/confirm-oauth',
//   validateBody(loginWithGoogleOAuthSchema),
//   ctrlWrapper(loginWithGoogleController),
// );

// export default router;
