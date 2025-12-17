# FedaPay Express (TypeScript)

Backend Express.js en TypeScript pour :
- initier un paiement Mobile Money, Moov Money, Celtiis Cash avec FedaPay
- vérifier le statut d’un paiement

Compatible avec :
- MTN Mobile Money
- Moov Money
- Celtiis Cash

- autres canaux supportés par FedaPay

---

## 🚀 Prérequis

- Node.js ≥ 18
- npm
- Un compte FedaPay **validé** (mode live ou sandbox)

---

## 📦 Installation

```bash
git clone https://github.com/Godwill05/fedapay-npm.git
cd fedapay-npm
npm install
npm run dev


cp .env.example .env
```

## ⚙️ Configuration
Éditez le fichier `.env` pour ajouter vos clés API FedaPay et configurer l'environnement :

```env
FEDAPAY_SECRET_KEY=your_fedapay_secret_key
FEDAPAY_ENV=sandbox # ou live
PORT=3000
```

## 🚀 Démarrage du serveur

```bash
npm run dev
```

## 🚀 Utilisation
### Initier un paiement
Envoyez une requête POST à `/api/pay` avec le corps JSON suivant :
```json
{
  "amount": 1000,
  "phone": "0197XXXXXX",
  "method": "mtn_open",
  "country": "BJ"
}


```

Method a adapter en fonction de l’opérateur et du pays :
- MTN Bénin : `mtn_open`
- Moov Money Bénin : `moov`
- Celtiis Cash Bénin : `sbin`

- MTN Côte d’Ivoire : `mtn_ci`
- MTN Ghana : `mtn_gh`
- Moov Togo : `moov_tg`

Dans chaque cas adapter le champ `country` en conséquence (`BJ`, `CI`, `GH`, `TG`, etc.)


### Reponse du serveur en cas de transaction réussite
```json
{
	"success": true,
	"data": {
		"transaction_id": <transactionId>,
		"status": "<status>",
		"amount": <montant>
	}
}
```
---

### Vérifier le statut d’un paiement
Envoyez une requête GET à `api/verify/<transactionId>` pour vérifier le statut d’un paiement.

### Reponse du serveur
```json
{
    "success": true,
    "data": {
        "transaction_id": <transactionId>,
        "status": "<status>",
        "amount": <montant>
    }
}
```

---
### Différents statuts possibles
- `pending` : Le paiement est en attente.
- `approved` : Le paiement a été effectué avec succès.
- `declined` : Le paiement a été refusé.
- `failed` : Le paiement a échoué.
- `expired` : Le paiement a expiré.
- `refunded` : Le paiement a été remboursé.
- `canceled` : Le paiement a été annulé.
---
## 🛠️ Personnalisation
Vous pouvez personnaliser le comportement du serveur en modifiant les fichiers dans le dossier `src/` selon vos besoins.