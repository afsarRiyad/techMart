
const getPasswordStrength = (password) => {
  if (!password) return null

  let score = 0
  if (password.length >= 12) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (password.length < 6 || score === 0) {
    return { label: 'Very weak', message: 'Very weak - Please enter a stronger password.', color: 'text-red-500', emoji: '🙁' }
  }
  if (score === 1) {
    return { label: 'Weak', message: 'Weak - Try adding numbers or symbols.', color: 'text-red-500', emoji: '🙁' }
  }
  if (score === 2) {
    return { label: 'Medium', message: 'Medium - Getting better, add more variety.', color: 'text-yellow-500', emoji: '😐' }
  }
  if (score === 3) {
    return { label: 'Strong', message: 'Strong password.', color: 'text-green-600', emoji: '🙂' }
  }
  return { label: 'Very strong', message: 'Very strong password.', color: 'text-green-700', emoji: '😄' }
}

export default getPasswordStrength