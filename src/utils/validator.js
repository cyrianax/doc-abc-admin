export default {
  required: (msg, trigger = 'blur') => ({ required: true, message: msg, trigger })
}