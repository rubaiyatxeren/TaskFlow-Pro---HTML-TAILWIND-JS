# TaskFlow Pro 📋

A modern, feature-rich task management web application built with vanilla JavaScript and Tailwind CSS. Organize your life with an intuitive interface, powerful filtering, and integrated productivity tools.

![TaskFlow Pro](https://via.placeholder.com/800x400/4f46e5/ffffff?text=TaskFlow+Pro+-+Organize+Your+Life)

## ✨ Features

### 🎯 Core Task Management
- **Add Tasks** with categories, priorities, and due dates
- **Smart Filtering** by status, category, and priority
- **Quick Actions** - complete, edit, delete tasks
- **Search Functionality** to find tasks instantly
- **Statistics Dashboard** with completion rates and insights

### 🏷️ Organization
- **Categories**: Work, Personal, Urgent, Fitness, Learning
- **Priority Levels**: Low, Medium, High with color coding
- **Due Dates** with visual indicators
- **Sorting** by date and priority

### 🌟 Integrated Widgets
- **Daily Inspiration** with random quotes
- **Weather Forecast** for any city worldwide
- **Developer News** from Dev.to community
- **Progress Tracking** with completion analytics

### 💾 Data Management
- **Local Storage** for persistent data
- **Export Tasks** as JSON backup
- **Responsive Design** works on all devices

## 🚀 Quick Start

### Prerequisites
- Modern web browser with JavaScript enabled
- Internet connection (for external APIs)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rubaiyatxeren/TaskFlow-Pro---HTML-TAILWIND-JS
   cd taskflow-pro
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser, or
   - Serve with a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve .
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Start organizing!**
   - Visit `http://localhost:8000` in your browser
   - Add your first task and explore the features

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome 6.4.0
- **APIs**:
  - Quotes: DummyJSON API
  - Weather: Open-Meteo API
  - News: Dev.to API
- **Storage**: Browser LocalStorage

## 📁 Project Structure

```
taskflow-pro/
├── index.html          # Main application file
├── app.js             # Core JavaScript logic
├── output.css         # Compiled Tailwind styles
├── app.css            # Additional custom styles
└── README.md          # Project documentation
```

## 🎮 How to Use

### Adding Tasks
1. Type your task in the input field
2. Select a category (Work, Personal, Urgent, Fitness, Learning)
3. Choose priority level (Low, Medium, High)
4. Set a due date (optional)
5. Click "Add Task" or press Enter

### Managing Tasks
- **Complete**: Click the circle button
- **Edit**: Click the ✏️ edit button
- **Delete**: Click the 🗑️ delete button
- **Filter**: Use filter buttons to view specific task groups

### Using Widgets
- **Weather**: Enter any city name and click "Get Weather"
- **News**: Click "Refresh News" for latest developer articles
- **Quotes**: Daily inspiration loads automatically

### Data Management
- **Export**: Download all tasks as JSON backup
- **Clear Completed**: Remove all finished tasks
- **Sort**: Organize tasks by due date

## 🔧 API Integration

The app integrates with several free APIs:

- **Quotes API**: `https://dummyjson.com/quotes/random`
- **Weather API**: Open-Meteo Geocoding & Forecast
- **News API**: Dev.to Articles API

All APIs are CORS-enabled and require no authentication.

## 🎨 Customization

### Adding New Categories
Edit the `CONFIG.CATEGORY_COLORS` object in `app.js`:

```javascript
CATEGORY_COLORS: {
  work: "bg-blue-100 text-blue-800",
  personal: "bg-green-100 text-green-800",
  // Add new categories here
  shopping: "bg-orange-100 text-orange-800",
}
```

### Modifying Colors
Update Tailwind classes in the configuration objects to match your preferred color scheme.

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- Weather API may occasionally timeout
- News feed might be empty if Dev.to API is unavailable
- Due dates use browser's local timezone

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Font Awesome](https://fontawesome.com/) for beautiful icons
- [DummyJSON](https://dummyjson.com/) for quotes API
- [Open-Meteo](https://open-meteo.com/) for weather data
- [Dev.to](https://dev.to/) for developer articles

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

**Made with ❤️ for productive developers everywhere**

*Organize your life, one task at a time*
