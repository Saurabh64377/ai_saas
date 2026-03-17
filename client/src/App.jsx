
import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Home from './Pages/Home'
import Layout from './Pages/Layout'
import DashBoard from './Pages/DashBoard'
import WriteArticle from './Pages/WriteArticle'
import BlogTitle from './Pages/BlogTitle'
import GenerateImages from './Pages/GenerateImages'
import RemoveBackground from './Pages/RemoveBackground'
import RemoveObject from './Pages/RemoveObject'
import ReviewResume from './Pages/ReviewResume'
import Community from './Pages/Community'

const App = () => {
  return (
    <div>
       <Routes>
         <Route path='/' element={<Home/>} />
         <Route  path='/ai' element={<Layout/>}>
         
          <Route index element={<DashBoard/>}  />
          <Route path='write-article' element={<WriteArticle/>}  />
          <Route path='blog-titles' element={<BlogTitle/>}  />
          <Route path='generate-images' element={<GenerateImages/>}  />
          <Route path='remove-background' element={<RemoveBackground/>}  />
          <Route path='remove-object' element={<RemoveObject/>}  />
          <Route path='review-resume' element={<ReviewResume/>}  />
          <Route path='community' element={<Community/>}  />
                   
         </Route>
       </Routes>
    </div>
  )
}

export default App
