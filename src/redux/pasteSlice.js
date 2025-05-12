import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';


const initialState = {
  pastes: localStorage.getItem('pastes') ? JSON.parse(localStorage.getItem('pastes')) : [],
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      const paste = action.payload
      state.pastes.push(paste)
        localStorage.setItem('pastes', JSON.stringify(state.pastes))
        
        toast('Paste added successfully', {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
    },
    
    updateToPastes: (state,action) => {
        const paste = action.payload
        const index = state.pastes.findIndex((p) => p._id === paste._id)
        if (index !== -1) {
          state.pastes[index] = paste
          localStorage.setItem('pastes', JSON.stringify(state.pastes))
          toast('Paste updated successfully', {
            icon: '👏',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
        } else {
          toast.error('Paste not found')
        }
     
    },
    resetAllPastes: (state, action) => {
        state.pastes = []
        localStorage.clear()
        toast('All pastes removed successfully', {
            icon: '👏',
            style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            },
        });
      
    },
    removeFromPastes: (state, action) => {
        const pasteId = action.payload
        const index = state.pastes.findIndex((p) => p._id === pasteId)
        if (index !== -1) {
          state.pastes.splice(index, 1)
          localStorage.setItem('pastes', JSON.stringify(state.pastes))

          toast('Paste removed successfully', {
            icon: '👏',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
        } else {
          toast.error('Paste not found')
        }
      
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer