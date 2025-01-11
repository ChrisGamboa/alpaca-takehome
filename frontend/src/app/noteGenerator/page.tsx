import NoteGeneratorForm from './NoteGeneratorForm'

export default function NoteGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Note Generator</h1>
      <NoteGeneratorForm />
    </div>
  )
}