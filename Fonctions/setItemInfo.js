import { set } from 'react-native-reanimated';
import * as db from '../Fonctions/firebaseJS';


/* Fonction pour sauvegarder les itéms récuperer */
export const saveItem = (nameItem, doc) => {

    switch (nameItem) {
        case "item1":
            setItem.item1.title = doc.title;
            setItem.item1.price = doc.price;
            break;
        case "item2":
            setItem.item2.title = doc.title;
            setItem.item2.price = doc.price;
            break;
        case "item3":
            setItem.item3.title = doc.title;
            setItem.item3.price = doc.price;
            break;
        case "item4":
            setItem.item4.title = doc.title;
            setItem.item4.price = doc.price;
            console.log("chargement fini ?")
            break;
        default:
            console.log("Error items");
            break;
    }

}

/* set d'item ( ensemble ) */
export const setItem = {

    item1: {
        title: " ",
        price: " ",
    },
    item2: {
        title: " ",
        price: " ",
    },
    item3: {
        title: " ",
        price: " ",
    },
    item4: {
        title: " ",
        price: " ",
    }

}

