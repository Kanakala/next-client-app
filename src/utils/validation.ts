/**
 * Email Validation
 * @author Sumanth Kanakala <kanakala.sumanth@gmail.com>
 */

const validateEmail = (email: string): boolean => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};

export { validateEmail };
