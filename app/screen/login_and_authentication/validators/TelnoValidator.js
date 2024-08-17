export function TelnoValidator(Telno) {
  if (!Telno) return "Telephone number can't be empty."
  if(!(int(Telno))) return "Telephone number must be figures"
  if (Telno.length < 8) return 'Telephone number must be at least 8 characters long.'
  return ''
}