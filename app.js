// =============== تطبيق إقلاع - Iqla3 ===============
// Nourddine Abatal © 2025

class Iqla3App {
    constructor() {
        this.quitStartDate = this.loadQuitDate();
        this.init();
    }

    init() {
        this.startClocks();
        this.updateHealingProgress();
        this.setupResetButton();
        this.simulateBioStats();
        
        // التحديث كل ثانية
        setInterval(() => this.startClocks(), 1000);
        setInterval(() => this.updateHealingProgress(), 5000);
    }

    // ========= الساعة الثنائية =========
    startClocks() {
        const now = new Date();
        
        // الوقت الحالي
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        document.getElementById('decimalTime').textContent = 
            `${hours}:${minutes}:${seconds}`;
        
        // تحويل إلى ثنائي
        const binaryH = parseInt(hours).toString(2).padStart(6, '0');
        const binaryM = parseInt(minutes).toString(2).padStart(6, '0');
        const binaryS = parseInt(seconds).toString(2).padStart(6, '0');
        
        document.getElementById('binaryTime').textContent = 
            `${binaryH}:${binaryM}:${binaryS}`;
        
        // مدة الإقلاع
        this.updateQuitDuration();
    }

    updateQuitDuration() {
        const now = new Date();
        const diff = now - this.quitStartDate;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('quitDuration').textContent = 
            `${String(days).padStart(4, '0')}يوم ${String(hours).padStart(2, '0')}س ${String(minutes).padStart(2, '0')}د ${String(seconds).padStart(2, '0')}ث`;
        
        // تحديث حلقة التقدم (الهدف: 30 يوم)
        const targetDays = 30;
        const progress = Math.min((days / targetDays) * 100, 100);
        
        const circle = document.getElementById('progressCircle');
        const circumference = 2 * Math.PI * 52; // r=52
        const offset = circumference - (progress / 100) * circumference;
        
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = offset;
        
        document.getElementById('progressPercent').textContent = 
            `${Math.round(progress)}%`;
    }

    // ========= تقدم تعافي الرئة =========
    updateHealingProgress() {
        const now = new Date();
        const diffMs = now - this.quitStartDate;
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        
        // مراحل التعافي
        let healingPercent = 0;
        let healingText = 'رئتاك تتجددان...';
        
        if (diffDays < 1) {
            healingPercent = 10;
            healingText = 'بداية رحلة التعافي...';
        } else if (diffDays < 3) {
            healingPercent = 25;
            healingText = 'النيكوتين يغادر جسدك...';
        } else if (diffDays < 7) {
            healingPercent = 40;
            healingText = 'تحسن التنفس بشكل ملحوظ...';
        } else if (diffDays < 14) {
            healingPercent = 60;
            healingText = 'الرئتان تنظفان نفسيهما...';
        } else if (diffDays < 30) {
            healingPercent = 75;
            healingText = 'الدورة الدموية تتحسن...';
        } else if (diffDays < 90) {
            healingPercent = 84;
            healingText = 'وظائف الرئة في تحسن مستمر...';
        } else {
            healingPercent = 95;
            healingText = 'أنت بطل! صحة رئتيك ممتازة...';
        }
        
        document.getElementById('healingFill').style.width = healingPercent + '%';
        document.getElementById('healingText').textContent = healingText;
    }

    // ========= إحصائيات حيوية متحركة =========
    simulateBioStats() {
        const pulseEl = document.getElementById('motivationPulse');
        const purityEl = document.getElementById('purityLevel');
        
        setInterval(() => {
            const pulse = 85 + Math.floor(Math.random() * 15);
            const purity = 60 + Math.floor(Math.random() * 20);
            
            pulseEl.textContent = pulse + '%';
            purityEl.textContent = purity + '%';
        }, 3000);
    }

    // ========= زر إعادة الضبط =========
    setupResetButton() {
        document.getElementById('resetButton').addEventListener('click', () => {
            if (confirm('هل أنت متأكد من إعادة ضبط مؤقت الإقلاع؟ هذه خطوة شجاعة جديدة!')) {
                this.quitStartDate = new Date();
                this.saveQuitDate(this.quitStartDate);
                
                // تأثير بصري
                const btn = document.getElementById('resetButton');
                btn.style.borderColor = '#4ade80';
                btn.style.boxShadow = '0 0 30px rgba(74, 222, 128, 0.5)';
                
                setTimeout(() => {
                    btn.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                    btn.style.boxShadow = 'none';
                }, 1000);
            }
        });
    }

    // ========= التخزين المحلي =========
    loadQuitDate() {
        const saved = localStorage.getItem('iqla3_quit_date');
        return saved ? new Date(parseInt(saved)) : new Date();
    }

    saveQuitDate(date) {
        localStorage.setItem('iqla3_quit_date', date.getTime().toString());
    }
}

// تشغيل التطبيق
document.addEventListener('DOMContentLoaded', () => {
    new Iqla3App();
});
