import { db } from '../firebase'
const ref = db.collection('retenes')
export const buscar = async (codigo, altura, exterior, interior) => {
  let retenes = []
  if (codigo != '') {
    let docs  = await ref.where('Articulo', '>=', codigo)
      .where('Articulo', '<=', codigo.substring(0, codigo.length -1) + String.fromCharCode(codigo.charCodeAt(codigo.length - 1) + 1))
      .get()
    docs.forEach(doc => {
      let reten = doc.data()
      console.log(reten)
      if (reten["ID"]) {
        reten["Articulo"] += "-" + reten["ID"]
      }
      if (reten["Tipo"]) {
        reten["Diseno"] = reten["Tipo"]
      }
      if (reten["Modelo"]) {
        reten["Diseno"] = reten["Modelo"]
      }
      retenes.push(reten)
    })
  } else if (interior != '') {
    let docs = await ref.where('Interior', 'array-contains', interior).get()
    docs.forEach(doc => {
      let reten = doc.data()
      if (reten["ID"]) {
        reten["Articulo"] += "-" + reten["ID"]
      }
      if (reten["Tipo"]) {
        reten["Diseno"] = reten["Tipo"]
      }
      if (reten["Modelo"]) {
        reten["Diseno"] = reten["Modelo"]
      }
      retenes.push(reten)
    })
    if (exterior != '') {
      retenes = retenes.filter(i => i['Exterior'].some(e => e == exterior))
    }
    if (altura != '') {
      retenes = retenes.filter(i => i['Altura'].some(a => a == altura))
    }
    return retenes
  } else if (exterior != '') {
    let docs = await ref.where('Exterior', 'array-contains', exterior).get()
    docs.forEach(doc => {
      let reten = doc.data()
      if (reten["ID"]) {
        reten["Articulo"] += "-" + reten["ID"]
      }
      if (reten["Tipo"]) {
        reten["Diseno"] = reten["Tipo"]
      }
      if (reten["Modelo"]) {
        reten["Diseno"] = reten["Modelo"]
      }
      retenes.push(reten)
    })
    if (altura != '') {
      retenes = retenes.filter(i => i['Altura'].some(a => a == altura))
    }
    return retenes
  } else if (altura != '') {
    let docs = await ref.where('Altura', 'array-contains', altura).get()
    docs.forEach(doc => {
      let reten = doc.data()
      if (reten["ID"]) {
        reten["Articulo"] += "-" + reten["ID"]
      }
      if (reten["Tipo"]) {
        reten["Diseno"] = reten["Tipo"]
      }
      if (reten["Modelo"]) {
        reten["Diseno"] = reten["Modelo"]
      }
      retenes.push(reten)
    })
  }
  return retenes 
}