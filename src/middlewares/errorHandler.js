import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Server error';
  res.status(status).json({ message });
};

//   if (err instanceof HttpError) {
//     res.status(err.status).json({
//       status: err.status,
//       message: err.name,
//       data: err,
//     });
//     return;
//   }

//   res.status(500).json({
//     status: 500,
//     message: 'Something went wrong',
//     data: err.message,
//   });
// };
