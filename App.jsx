import React, { useState, useEffect } from 'react'

export default function App() {
  const [prompts, setPrompts] = useState([])
  const [selected, setSelected] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetch('/prompts/index.json').then(r=>r.json()).then(setPrompts)
  }, [])

  const filtered = prompts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.tags.join(' ').toLowerCase().includes(query.toLowerCase()))

  return (
    <div className='container'>
      <h1>JSON Prompting Guide</h1>
      <input placeholder='Search title or tags' value={query} onChange={e=>setQuery(e.target.value)} />
      <div style={{display:'flex', gap:16, marginTop:16}}>
        <div style={{width:300}}>
          <ul>
            {filtered.map(p=>(
              <li key={p.id} style={{marginBottom:8, cursor:'pointer'}} onClick={()=>setSelected(p)}>
                <strong>{p.title}</strong><div style={{fontSize:12,color:'#666'}}>{p.category}</div>
              </li>
            ))}
          </ul>
        </div>
        <div style={{flex:1}}>
          {selected ? <PromptViewer filename={selected.filename} /> : <div>Select a prompt</div>}
        </div>
      </div>
    </div>
  )
}

function PromptViewer({filename}){
  const [data, setData] = useState(null)
  useEffect(()=>{
    fetch(filename).then(r=>r.json()).then(setData)
  },[filename])
  if(!data) return <div>Loading...</div>
  return (
    <div>
      <h2>{data.title}</h2>
      <div>{data.description}</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
