<template>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap"
    rel="stylesheet"
  />

  <div class="background">
    <div class="shape"></div>
    <div class="shape"></div>
  </div>

  <form @submit.prevent="register">
    <h3>Registro</h3>

    <label for="firstName">First Name</label>
    <input type="text" id="firstName" v-model="form.firstName" placeholder="Nombre" />

    <label for="lastName">Last Name</label>
    <input type="text" id="lastName" v-model="form.lastName" placeholder="Apellido" />

    <label for="dob">Date of Birth</label>
    <input type="date" id="dob" v-model="form.dateOfBirth" />

    <label for="country">Country</label>
    <select id="country" v-model="form.country">
      <option value="">Selecciona un país</option>
      <option value="ES">España</option>
      <option value="US">Estados Unidos</option>
      <option value="MX">México</option>
      <option value="AR">Argentina</option>
      <option value="CO">Colombia</option>
    </select>

    <label for="address">Address</label>
    <input type="text" id="address" v-model="form.address" placeholder="Dirección" />

    <label for="email">Email</label>
    <input type="email" id="email" v-model="form.email" placeholder="Correo electrónico" />

    <label for="password">Password</label>
    <input type="password" id="password" v-model="form.password" placeholder="Contraseña" />

    <label for="type">Type</label>
    <select id="type" v-model="form.type">
      <option value="">Selecciona un tipo</option>
      <option value="U">U</option>
    </select>

    <div class="errors" v-if="errors.length">
      <ul>
        <li v-for="(err, idx) in errors" :key="idx">{{ err }}</li>
      </ul>
    </div>

    <button type="submit">Registrar</button>
  </form>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        dateOfBirth: '', // YYYY-MM-DD
        country: '',
        address: '',
        email: '',
        password: '',
        type: '',
      },
      errors: [],
    }
  },
  methods: {
    register() {
      console.log('Registrando usuario...')
      console.log(this.form)
      // Validación mínima antes de emitir (puedes ampliarla)
      if (!this.form.firstName || !this.form.lastName || !this.form.email || !this.form.password) {
        // En un app real, mostrar feedback al usuario
        console.warn('Faltan campos obligatorios')
        return
      }
      console.log('Datos de registro:', this.form)
      let endpointURL = '/api/user/signup'
      let userData = { ...this.form }

      this.$api
        .post(endpointURL, userData)
        .then((response) => {
          console.log('Registro exitoso:', response)
          // Mostrar notificación de éxito
          if (this.$q && this.$q.notify) {
            this.$q.notify({
              type: 'positive',
              position: 'top',
              message: 'Registro exitoso. Por favor inicia sesión.',
            })
          }
          // Redirigir a la página de login
          if (this.$router) {
            this.$router.push('/login')
          }
        })
        .catch((error) => {
          console.log('Ocurrió un error al registrar: ' + error)
          this.$q.notify({
            type: 'negative',
            position: 'top',
            message: 'Error al registrar usuario.',
          })
        })
    },
  },
}
</script>

<style>
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  background-color: #080710;
}
.background {
  width: 650px;
  height: 720px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
.background .shape {
  height: 200px;
  width: 200px;
  position: absolute;
  border-radius: 50%;
}
.shape:first-child {
  background: linear-gradient(#1845ad, #23a2f6);
  left: -80px;
  top: -80px;
}
.shape:last-child {
  background: linear-gradient(to right, #ff512f, #f09819);
  right: -30px;
  bottom: -80px;
}
form {
  height: auto;
  width: 520px;
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 30px 35px;
}
form * {
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}
form h3 {
  font-size: 28px;
  font-weight: 500;
  line-height: 36px;
  text-align: center;
}

label {
  display: block;
  margin-top: 18px;
  font-size: 14px;
  font-weight: 500;
}
input,
select {
  display: block;
  height: 42px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
  color: #ffffff;
}
::placeholder {
  color: #e5e5e5;
}
button {
  margin-top: 20px;
  width: 100%;
  background-color: #ffffff;
  color: #080710;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
}
.errors {
  margin-top: 12px;
  background: rgba(255, 0, 0, 0.08);
  padding: 8px 10px;
  border-radius: 4px;
}
.errors ul {
  list-style: disc;
  margin-left: 18px;
}
.social {
  margin-top: 30px;
  display: flex;
}
.social div {
  background: red;
  width: 150px;
  border-radius: 3px;
  padding: 5px 10px 10px 5px;
  background-color: rgba(255, 255, 255, 0.27);
  color: #eaf0fb;
  text-align: center;
}
.social div:hover {
  background-color: rgba(255, 255, 255, 0.47);
}
.social .fb {
  margin-left: 25px;
}
.social i {
  margin-right: 4px;
}
</style>
