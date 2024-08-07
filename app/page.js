'use client'
import Image from "next/image";
import {useState, useEffect} from 'react'
import {firestore} from '@/firebase'
import {Box, Modal, Typography, Stack, TextField, Button} from '@mui/material'
import {collection, deleteDoc, doc, getDocs, query, getDoc, setDoc} from 'firebase/firestore'

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(true)
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
    } else {
      await setDoc(docRef, {quantity: 1})
    }

    await updateInventory()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }

    await updateInventory()
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      bgcolor="black"
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%,-50%)"
          width={400}
          bgcolor="#1a1a1a"
          border="2px solid #444"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: 'translate(-50%,-50%)',
          }}
        >
          <Typography variant="h6" className="custom-font" color="#f0f0f0">Item Up!</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value)
              }}
              sx={{
                bgcolor: 'white',
                borderRadius: 1,
              }}
            />
            <Button
              variant="outlined"
              className="custom-font"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
              sx={{
                bgcolor: '#333',
                color: '#f0f0f0',
                '&:hover': {
                  bgcolor: '#555',
                },
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button
        variant="contained"
        className="custom-font"
        onClick={() => {
          handleOpen()
        }}
        sx={{
          bgcolor: '#444',
          color: '#f0f0f0',
          '&:hover': {
            bgcolor: '#666',
          },
        }}
      >
        Add New Item
      </Button>
      <Box border="1px solid #333" width="800px">
        <Box
          width="100%"
          height="100px"
          bgcolor="#E6E6FA"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h4" color="#000000s" className="custom-font">
            Inventory Items
          </Typography>
        </Box>
      </Box>
      <Stack width="800px" height="300px" spacing={2} overflow="auto" bgcolor="#222">
        {inventory.map(({name, quantity}) => (
          <Box
            key={name}
            width="100%"
            minHeight="150px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            bgcolor="#333"
            padding={5}
            borderRadius={2}
          >
            <Typography variant="h5" color="#f0f0f0" textAlign="center">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant="h5" color="#f0f0f0" textAlign="center">
              {quantity}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                className="custom-font"
                onClick={() => {
                  addItem(name)
                }}
                sx={{
                  bgcolor: '#4caf50',
                  '&:hover': {
                    bgcolor: '#66bb6a',
                  },
                }}
              >
                Add
              </Button>
              <Button
                variant="contained"
                className="custom-font"
                onClick={() => {
                  removeItem(name)
                }}
                sx={{
                  bgcolor: '#f44336',
                  '&:hover': {
                    bgcolor: '#e57373',
                  },
                }}
              >
                Remove
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
