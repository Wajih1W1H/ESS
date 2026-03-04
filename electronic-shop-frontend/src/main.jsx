import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'

// Styles globaux avec Poppins
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background-color: #f0f2f5;
    color: #1c1e21;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

// Injection des styles globaux
const style = document.createElement('style')
style.textContent = globalStyles
document.head.appendChild(style)

const colors = {
  primary: '#1877f2',
  primaryDark: '#166fe5',
  secondary: '#42b72a',
  background: '#f0f2f5',
  white: '#ffffff',
  text: '#1c1e21',
  textLight: '#65676b',
  border: '#dddfe2',
  success: '#00a400',
  error: '#fa3838',
  warning: '#f7b928'
}

const styles = {
  app: {
    minHeight: '100vh',
  },
  nav: {
    backgroundColor: colors.white,
    borderBottom: `1px solid ${colors.border}`,
    padding: '0.8rem 2rem',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  navContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navLogo: {
    color: colors.primary,
    fontSize: '1.8rem',
    fontWeight: '700',
    textDecoration: 'none',
    letterSpacing: '-0.5px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: "'Poppins', sans-serif",
  },
  navLogoIcon: {
    fontSize: '2rem',
  },
  navLinks: {
    display: 'flex',
    gap: '0.5rem',
  },
  navLink: {
    color: colors.text,
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '500',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    transition: 'all 0.2s',
    fontFamily: "'Poppins', sans-serif",
    ':hover': {
      backgroundColor: colors.background,
      color: colors.primary,
    },
  },
  navLinkActive: {
    backgroundColor: colors.primary,
    color: colors.white,
    ':hover': {
      backgroundColor: colors.primaryDark,
      color: colors.white,
    },
  },
  mainContent: {
    marginTop: '80px',
    minHeight: 'calc(100vh - 80px)',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem',
  },
  hero: {
    position: 'relative',
    height: '600px',
    borderRadius: '16px',
    overflow: 'hidden',
    marginBottom: '3rem',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  },
  heroImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 1,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(24,119,242,0.9) 0%, rgba(24,119,242,0.7) 100%)',
    zIndex: 2,
  },
  heroContent: {
    position: 'relative',
    zIndex: 3,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: colors.white,
    padding: '2rem',
  },
  heroTitle: {
    fontSize: '4rem',
    fontWeight: '700',
    marginBottom: '1rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
    animation: 'fadeInUp 1s ease',
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: '-1px',
  },
  heroSubtitle: {
    fontSize: '1.3rem',
    marginBottom: '2rem',
    opacity: 0.95,
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
    animation: 'fadeInUp 1s ease 0.2s both',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: '300',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    animation: 'fadeInUp 1s ease 0.4s both',
  },
  button: {
    padding: '1rem 2.5rem',
    borderRadius: '50px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.3s',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    fontFamily: "'Poppins', sans-serif",
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 15px rgba(0,0,0,0.2)',
    },
  },
  buttonPrimary: {
    backgroundColor: colors.white,
    color: colors.primary,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    color: colors.white,
    border: `2px solid ${colors.white}`,
    ':hover': {
      backgroundColor: colors.white,
      color: colors.primary,
    },
  },
  sectionTitle: {
    fontSize: '2.2rem',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '2rem',
    textAlign: 'center',
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: '-0.5px',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'all 0.3s',
    ':hover': {
      boxShadow: '0 20px 30px rgba(0,0,0,0.15)',
      transform: 'translateY(-8px)',
    },
  },
  cardImage: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    transition: 'transform 0.5s',
    ':hover': {
      transform: 'scale(1.05)',
    },
  },
  cardContent: {
    padding: '1.5rem',
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: colors.text,
    fontFamily: "'Poppins', sans-serif",
  },
  cardDescription: {
    color: colors.textLight,
    fontSize: '0.9rem',
    marginBottom: '1rem',
    lineHeight: '1.6',
    fontFamily: "'Poppins', sans-serif",
  },
  cardPrice: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: colors.primary,
    marginBottom: '1rem',
    fontFamily: "'Poppins', sans-serif",
  },
  cardStock: {
    display: 'inline-block',
    padding: '0.25rem 1rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '500',
    marginBottom: '1rem',
    fontFamily: "'Poppins', sans-serif",
  },
  stockNormal: {
    backgroundColor: '#e7f3e7',
    color: colors.success,
  },
  stockLow: {
    backgroundColor: '#fff3e7',
    color: colors.warning,
  },
  stockZero: {
    backgroundColor: '#fce8e8',
    color: colors.error,
  },
  whatsappButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1.2rem',
    backgroundColor: '#25D366',
    color: colors.white,
    textDecoration: 'none',
    borderRadius: '25px',
    fontSize: '0.85rem',
    fontWeight: '500',
    transition: 'all 0.3s',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(37,211,102,0.3)',
    fontFamily: "'Poppins', sans-serif",
    ':hover': {
      backgroundColor: '#128C7E',
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 15px rgba(37,211,102,0.4)',
    },
  },
  formContainer: {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '2.5rem',
    backgroundColor: colors.white,
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  },
  formTitle: {
    fontSize: '1.8rem',
    fontWeight: '600',
    marginBottom: '2rem',
    color: colors.text,
    textAlign: 'center',
    fontFamily: "'Poppins', sans-serif",
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: colors.text,
    fontFamily: "'Poppins', sans-serif",
    fontSize: '0.9rem',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    border: `2px solid ${colors.border}`,
    borderRadius: '8px',
    fontSize: '0.95rem',
    transition: 'all 0.2s',
    outline: 'none',
    fontFamily: "'Poppins', sans-serif",
    ':focus': {
      borderColor: colors.primary,
      boxShadow: `0 0 0 3px ${colors.primary}20`,
    },
  },
  submitButton: {
    width: '100%',
    padding: '0.8rem',
    backgroundColor: colors.primary,
    color: colors.white,
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontFamily: "'Poppins', sans-serif",
    ':hover': {
      backgroundColor: colors.primaryDark,
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 15px rgba(24,119,242,0.3)',
    },
  },
  message: {
    marginTop: '1rem',
    padding: '1rem',
    borderRadius: '8px',
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '0.9rem',
  },
  messageSuccess: {
    backgroundColor: '#e7f3e7',
    color: colors.success,
  },
  messageError: {
    backgroundColor: '#fce8e8',
    color: colors.error,
  },
  messageInfo: {
    backgroundColor: '#e7f0fe',
    color: colors.primary,
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    padding: '1rem 0',
    borderBottom: `2px solid ${colors.border}`,
  },
  headerTitle: {
    fontSize: '1.8rem',
    fontWeight: '600',
    color: colors.text,
    fontFamily: "'Poppins', sans-serif",
  },
  addButton: {
    padding: '0.8rem 1.5rem',
    backgroundColor: colors.primary,
    color: colors.white,
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: "'Poppins', sans-serif",
    ':hover': {
      backgroundColor: colors.primaryDark,
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 15px rgba(24,119,242,0.3)',
    },
  },
  loading: {
    textAlign: 'center',
    padding: '4rem',
    fontSize: '1.1rem',
    color: colors.textLight,
    fontFamily: "'Poppins', sans-serif",
  },
  link: {
    color: colors.primary,
    textDecoration: 'none',
    fontWeight: '500',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '0.9rem',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  table: {
    backgroundColor: colors.white,
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  tableHeader: {
    backgroundColor: colors.background,
    padding: '1rem',
    fontWeight: '600',
    color: colors.text,
    textAlign: 'left',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '0.9rem',
  },
  tableRow: {
    borderBottom: `1px solid ${colors.border}`,
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: colors.background,
    },
  },
  tableCell: {
    padding: '1rem',
    color: colors.text,
    fontFamily: "'Poppins', sans-serif",
    fontSize: '0.9rem',
  },
  badge: {
    padding: '0.25rem 1rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '500',
    display: 'inline-block',
    fontFamily: "'Poppins', sans-serif",
  },
  badgeSale: {
    backgroundColor: '#e7f3e7',
    color: colors.success,
  },
  badgeExpense: {
    backgroundColor: '#fce8e8',
    color: colors.error,
  },
  badgeWithdrawal: {
    backgroundColor: '#fff3e7',
    color: colors.warning,
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  statCard: {
    backgroundColor: colors.white,
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    },
  },
  statValue: {
    fontSize: '2.2rem',
    fontWeight: '700',
    color: colors.primary,
    marginBottom: '0.5rem',
    fontFamily: "'Poppins', sans-serif",
  },
  statLabel: {
    color: colors.textLight,
    fontSize: '0.95rem',
    fontWeight: '500',
    fontFamily: "'Poppins', sans-serif",
  },
  footer: {
    backgroundColor: colors.white,
    padding: '3rem 2rem',
    marginTop: '4rem',
    borderTop: `1px solid ${colors.border}`,
  },
  footerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
  },
  footerSection: {
    color: colors.textLight,
  },
  footerTitle: {
    color: colors.text,
    fontWeight: '600',
    marginBottom: '1rem',
    fontSize: '1.1rem',
    fontFamily: "'Poppins', sans-serif",
  },
  footerLink: {
    color: colors.textLight,
    textDecoration: 'none',
    display: 'block',
    marginBottom: '0.5rem',
    transition: 'color 0.2s',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '0.9rem',
    ':hover': {
      color: colors.primary,
    },
  },
}

const Home = () => {
  return (
    <>
      <div style={styles.hero}>
        <img 
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1400&h=600&fit=crop"
          alt="Hero"
          style={styles.heroImage}
        />
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Electronic Shop</h1>
          <p style={styles.heroSubtitle}>La meilleure expérience d'achat pour vos appareils électroniques</p>
          <div style={styles.buttonGroup}>
            <Link to="/shop/1" style={{...styles.button, ...styles.buttonPrimary}}>
              Découvrir la boutique
            </Link>
            <Link to="/login" style={{...styles.button, ...styles.buttonSecondary}}>
              Espace administrateur
            </Link>
          </div>
        </div>
      </div>
      
      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>Produits populaires</h2>
        <div style={styles.productGrid}>
          {[1,2,3].map(i => (
            <div key={i} style={styles.card}>
              <img 
                src={`https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop`}
                alt="Produit"
                style={styles.cardImage}
              />
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>iPhone 13 Pro</h3>
                <p style={styles.cardDescription}>Le smartphone le plus avancé avec appareil photo professionnel</p>
                <div style={styles.cardPrice}>900 000 FCFA</div>
                <span style={{...styles.cardStock, ...styles.stockNormal}}>En stock</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

const Login = () => {
  const [email, setEmail] = useState('monadmin@shop.com')
  const [password, setPassword] = useState('monpass123')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('Connexion en cours...')
    setMessageType('info')
    
    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setMessage('Connexion réussie!')
        setMessageType('success')
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setTimeout(() => navigate('/products'), 1500)
      } else {
        setMessage(data.error || 'Email ou mot de passe incorrect')
        setMessageType('error')
      }
    } catch (error) {
      setMessage('Erreur de connexion au serveur')
      setMessageType('error')
    }
  }

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.formTitle}>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.submitButton}>
          Se connecter
        </button>
      </form>
      {message && (
        <div style={{
          ...styles.message,
          ...(messageType === 'success' ? styles.messageSuccess : {}),
          ...(messageType === 'error' ? styles.messageError : {}),
          ...(messageType === 'info' ? styles.messageInfo : {})
        }}>
          {message}
        </div>
      )}
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Pas encore de compte ? <Link to="/register" style={styles.link}>S'inscrire</Link>
      </p>
    </div>
  )
}

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Admin',
    shop_id: 1
  })
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('Inscription en cours...')
    setMessageType('info')
    
    try {
      const response = await fetch('http://localhost:8081/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setMessage('Inscription réussie!')
        setMessageType('success')
        setTimeout(() => navigate('/login'), 2000)
      } else {
        setMessage(data.error || "Erreur d'inscription")
        setMessageType('error')
      }
    } catch (error) {
      setMessage('Erreur de connexion au serveur')
      setMessageType('error')
    }
  }

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.formTitle}>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Rôle</label>
          <select name="role" value={formData.role} onChange={handleChange} style={styles.input}>
            <option value="Admin">Admin</option>
            <option value="SuperAdmin">SuperAdmin</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Boutique ID</label>
          <input
            type="number"
            name="shop_id"
            value={formData.shop_id}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.submitButton}>
          S'inscrire
        </button>
      </form>
      {message && (
        <div style={{
          ...styles.message,
          ...(messageType === 'success' ? styles.messageSuccess : {}),
          ...(messageType === 'error' ? styles.messageError : {}),
          ...(messageType === 'info' ? styles.messageInfo : {})
        }}>
          {message}
        </div>
      )}
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Déjà un compte ? <Link to="/login" style={styles.link}>Se connecter</Link>
      </p>
    </div>
  )
}

const PublicShop = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8081/public/shop/1/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div style={styles.loading}>Chargement...</div>

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Notre Boutique</h1>
      </div>
      <div style={styles.productGrid}>
        {products.map(product => (
          <div key={product.id} style={styles.card}>
            <img 
              src={product.image_url || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop'}
              alt={product.name}
              style={styles.cardImage}
            />
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>{product.name}</h3>
              <p style={styles.cardDescription}>{product.description}</p>
              <div style={styles.cardPrice}>{product.selling_price?.toLocaleString()} FCFA</div>
              <span style={{
                ...styles.cardStock,
                ...(product.stock === 0 ? styles.stockZero : 
                   product.stock < 5 ? styles.stockLow : styles.stockNormal)
              }}>
                {product.stock === 0 ? 'Rupture de stock' : `${product.stock} en stock`}
              </span>
              <div style={{ marginTop: '1rem' }}>
                <a
                  href={`https://wa.me/?text=Bonjour, je suis intéressé par ${product.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.whatsappButton}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 21L6.3 19.66C7.75 20.46 9.38 20.88 11.04 20.88C16.5 20.88 20.96 16.42 20.96 10.96C20.96 5.5 16.5 2 12.04 2M12.04 4C16.84 4 20.96 7.53 20.96 11.91C20.96 16.29 16.84 19.82 12.04 19.82C10.57 19.82 9.13 19.45 7.84 18.76L7.54 18.6L5.07 19.3L5.8 16.93L5.63 16.62C4.87 15.27 4.13 13.61 4.13 11.91C4.13 7.53 8.25 4 12.04 4M8.9 7.4C8.75 7.4 8.45 7.46 8.2 7.74C7.95 8.02 7.27 8.67 7.27 10C7.27 11.33 8.23 12.62 8.35 12.79C8.47 12.96 9.92 15.11 12.14 16.05C14.36 16.99 14.36 16.56 15.08 16.45C15.8 16.34 16.49 15.81 16.7 15.28C16.91 14.75 16.91 14.3 16.84 14.19C16.77 14.08 16.58 14.02 16.3 13.89C16.02 13.76 14.92 13.22 14.66 13.13C14.4 13.04 14.21 13 14.02 13.26C13.83 13.52 13.29 14.15 13.14 14.33C12.99 14.51 12.84 14.53 12.56 14.4C12.28 14.27 11.58 14.03 10.74 13.29C9.9 12.55 9.51 11.82 9.36 11.56C9.21 11.3 9.34 11.16 9.47 11.03C9.59 10.9 9.74 10.71 9.86 10.55C9.98 10.39 10.02 10.27 10.1 10.09C10.18 9.91 10.14 9.75 10.08 9.62C10.02 9.49 9.63 8.38 9.46 7.97C9.29 7.56 9.11 7.4 8.9 7.4Z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    fetch('http://localhost:8081/api/products', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div style={styles.loading}>Chargement...</div>

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Gestion des Produits</h1>
        <button onClick={() => navigate('/products/new')} style={styles.addButton}>
          + Nouveau produit
        </button>
      </div>
      <div style={styles.productGrid}>
        {products.map(product => (
          <div key={product.id} style={styles.card}>
            <img 
              src={product.image_url || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop'}
              alt={product.name}
              style={styles.cardImage}
            />
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>{product.name}</h3>
              <p style={styles.cardDescription}>{product.description}</p>
              <div style={styles.cardPrice}>{product.selling_price?.toLocaleString()} FCFA</div>
              <span style={{
                ...styles.cardStock,
                ...(product.stock === 0 ? styles.stockZero : 
                   product.stock < 5 ? styles.stockLow : styles.stockNormal)
              }}>
                {product.stock === 0 ? 'Rupture' : `${product.stock} en stock`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    selling_price: '',
    stock: '',
    image_url: ''
  })
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    
    setMessage('Création en cours...')
    setMessageType('info')
    
    try {
      const response = await fetch('http://localhost:8081/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setMessage('Produit créé avec succès!')
        setMessageType('success')
        setTimeout(() => navigate('/products'), 1500)
      } else {
        setMessage('Erreur lors de la création')
        setMessageType('error')
      }
    } catch (error) {
      setMessage('Erreur de connexion au serveur')
      setMessageType('error')
    }
  }

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.formTitle}>Nouveau produit</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nom</label>
          <input name="name" value={formData.name} onChange={handleChange} style={styles.input} required />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} style={styles.input} rows="3" />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Catégorie</label>
          <input name="category" value={formData.category} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Prix de vente</label>
          <input type="number" name="selling_price" value={formData.selling_price} onChange={handleChange} style={styles.input} required />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Stock</label>
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} style={styles.input} required />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Image URL</label>
          <input name="image_url" value={formData.image_url} onChange={handleChange} style={styles.input} placeholder="https://..." />
        </div>
        <button type="submit" style={styles.submitButton}>Créer le produit</button>
      </form>
      {message && (
        <div style={{
          ...styles.message,
          ...(messageType === 'success' ? styles.messageSuccess : {}),
          ...(messageType === 'error' ? styles.messageError : {}),
          ...(messageType === 'info' ? styles.messageInfo : {})
        }}>
          {message}
        </div>
      )}
    </div>
  )
}

const Transactions = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalSales: 0,
    totalExpenses: 0,
    netProfit: 0
  })
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    Promise.all([
      fetch('http://localhost:8081/api/transactions', {
        headers: { 'Authorization': `Bearer ${token}` }
      }),
      fetch('http://localhost:8081/api/reports/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    ])
      .then(async ([transRes, statsRes]) => {
        const transData = await transRes.json()
        const statsData = await statsRes.json()
        setTransactions(transData)
        setStats(statsData)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div style={styles.loading}>Chargement...</div>

  const getTypeBadge = (type) => {
    switch(type) {
      case 'Sale': return {...styles.badge, ...styles.badgeSale}
      case 'Expense': return {...styles.badge, ...styles.badgeExpense}
      case 'Withdrawal': return {...styles.badge, ...styles.badgeWithdrawal}
      default: return styles.badge
    }
  }

  const getTypeLabel = (type) => {
    switch(type) {
      case 'Sale': return 'Vente'
      case 'Expense': return 'Dépense'
      case 'Withdrawal': return 'Retrait'
      default: return type
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Transactions</h1>
      </div>

      <div style={styles.stats}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.totalSales?.toLocaleString()} FCFA</div>
          <div style={styles.statLabel}>Total des ventes</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.totalExpenses?.toLocaleString()} FCFA</div>
          <div style={styles.statLabel}>Total des dépenses</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.netProfit?.toLocaleString()} FCFA</div>
          <div style={styles.statLabel}>Profit net</div>
        </div>
      </div>

      <div style={styles.table}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Type</th>
              <th style={styles.tableHeader}>Produit</th>
              <th style={styles.tableHeader}>Quantité</th>
              <th style={styles.tableHeader}>Montant</th>
              <th style={styles.tableHeader}>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t.id} style={styles.tableRow}>
                <td style={styles.tableCell}>
                  <span style={getTypeBadge(t.type)}>{getTypeLabel(t.type)}</span>
                </td>
                <td style={styles.tableCell}>{t.product_id || '-'}</td>
                <td style={styles.tableCell}>{t.quantity}</td>
                <td style={styles.tableCell}>{t.amount?.toLocaleString()} FCFA</td>
                <td style={styles.tableCell}>{new Date(t.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const App = () => {
  const location = window.location.pathname
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <BrowserRouter>
      <div style={styles.app}>
        <nav style={styles.nav}>
          <div style={styles.navContainer}>
            <Link to="/" style={styles.navLogo}>
              <span style={styles.navLogoIcon}></span>
              Electronic Shop
            </Link>
            <div style={styles.navLinks}>
              <Link to="/" style={{...styles.navLink, ...(location === '/' ? styles.navLinkActive : {})}}>
                Accueil
              </Link>
              <Link to="/shop/1" style={{...styles.navLink, ...(location === '/shop/1' ? styles.navLinkActive : {})}}>
                Boutique
              </Link>
              {!user ? (
                <>
                  <Link to="/login" style={{...styles.navLink, ...(location === '/login' ? styles.navLinkActive : {})}}>
                    Connexion
                  </Link>
                  <Link to="/register" style={{...styles.navLink, ...(location === '/register' ? styles.navLinkActive : {})}}>
                    Inscription
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/products" style={{...styles.navLink, ...(location === '/products' ? styles.navLinkActive : {})}}>
                    Produits
                  </Link>
                  <Link to="/transactions" style={{...styles.navLink, ...(location === '/transactions' ? styles.navLinkActive : {})}}>
                    Transactions
                  </Link>
                  {user.role === 'SuperAdmin' && (
                    <Link to="/dashboard" style={{...styles.navLink, ...(location === '/dashboard' ? styles.navLinkActive : {})}}>
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      localStorage.removeItem('token')
                      localStorage.removeItem('user')
                      setUser(null)
                      window.location.href = '/'
                    }}
                    style={styles.navLink}
                  >
                    Déconnexion
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>

        <div style={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/shop/:shopId" element={<PublicShop />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </div>

        <footer style={styles.footer}>
          <div style={styles.footerContent}>
            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>Electronic Shop</h3>
              <p>Votre partenaire de confiance pour l'électronique</p>
            </div>
            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>Liens rapides</h3>
              <Link to="/" style={styles.footerLink}>Accueil</Link>
              <Link to="/shop/1" style={styles.footerLink}>Boutique</Link>
              <Link to="/login" style={styles.footerLink}>Connexion</Link>
            </div>
            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>Contact</h3>
              <p>Email: contact@electronicshop.com</p>
              <p>Tél: +221 77 777 77 77</p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)