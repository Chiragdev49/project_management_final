export const asyncHandler = (fn) => (req, res, next) => {
    console.log("ASYNC HANDLER LOADED"); // 👈 ADD THIS
    Promise.resolve(fn(req, res, next)).catch(next);
};