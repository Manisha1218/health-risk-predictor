
        // ============ DATA ============
        const healthData = {
            glucoseHistory: [95, 102, 98, 105, 100, 97, 98],
            bmiHistory: [25.2, 25.0, 24.9, 24.8, 24.8, 24.7, 24.8],
            bpHistory: [
                { systolic: 122, diastolic: 82 },
                { systolic: 120, diastolic: 80 },
                { systolic: 118, diastolic: 78 },
                { systolic: 120, diastolic: 80 },
                { systolic: 119, diastolic: 79 },
                { systolic: 121, diastolic: 81 },
                { systolic: 120, diastolic: 80 }
            ],
            activityMinutes: [45, 60, 30, 55, 40, 70, 50]
        };

        const recentActivities = [
            { type: 'checkup', title: 'Annual Checkup Completed', desc: 'All vitals within normal range', time: '2 hours ago', status: 'success' },
            { type: 'glucose', title: 'Glucose Level Recorded', desc: '98 mg/dL - Fasting', time: '5 hours ago', status: 'normal' },
            { type: 'prediction', title: 'AI Prediction Updated', desc: 'Risk score decreased by 3%', time: '1 day ago', status: 'success' },
            { type: 'exercise', title: 'Exercise Goal Achieved', desc: '45 minutes of walking', time: '1 day ago', status: 'success' },
            { type: 'medication', title: 'Medication Reminder', desc: 'Vitamin D supplement', time: '2 days ago', status: 'info' }
        ];

        const priorityInsights = [
            { priority: 'high', title: 'Glucose Optimization', desc: 'Your fasting glucose has improved 8% this month. Continue current diet.', icon: 'activity', color: 'var(--success)' },
            { priority: 'medium', title: 'BMI Management', desc: 'You are 0.8 points from optimal BMI. Consider adding 15 min daily walking.', icon: 'target', color: 'var(--warning)' },
            { priority: 'low', title: 'Sleep Quality', desc: 'Your sleep patterns could improve. Aim for 7-8 hours consistently.', icon: 'moon', color: 'var(--tertiary)' }
        ];

        const detailedRecommendations = [
            { category: 'Diet', title: 'Increase Fiber Intake', desc: 'Add 25-30g of fiber daily from whole grains, vegetables, and legumes.', impact: 'High', effort: 'Easy' },
            { category: 'Exercise', title: 'Add Resistance Training', desc: 'Include 2-3 sessions of strength training per week to improve insulin sensitivity.', impact: 'High', effort: 'Moderate' },
            { category: 'Lifestyle', title: 'Manage Stress Levels', desc: 'Practice stress-reduction techniques like meditation or yoga for 10-15 minutes daily.', impact: 'Medium', effort: 'Easy' },
            { category: 'Monitoring', title: 'Regular Glucose Testing', desc: 'Test fasting glucose 2-3 times per week to track patterns.', impact: 'Medium', effort: 'Easy' }
        ];

        const healthTimeline = [
            { date: 'Jan 2024', title: 'Started Health Monitoring', desc: 'Initial assessment completed', status: 'start' },
            { date: 'Mar 2024', title: 'First AI Prediction', desc: 'Low risk score: 18%', status: 'milestone' },
            { date: 'Jun 2024', title: 'Lifestyle Changes', desc: 'Diet and exercise improvements', status: 'progress' },
            { date: 'Sep 2024', title: 'Significant Progress', desc: 'Risk score reduced to 12%', status: 'achievement' },
            { date: 'Now', title: 'Current Status', desc: 'Maintaining healthy metrics', status: 'current' }
        ];

        const predictionsData = [
            { id: 'P-2847', age: 52, glucose: 145, bmi: 29.4, risk: 'High', score: 78 },
            { id: 'P-2846', age: 34, glucose: 95, bmi: 22.1, risk: 'Low', score: 8 },
            { id: 'P-2845', age: 45, glucose: 118, bmi: 26.8, risk: 'Medium', score: 42 },
            { id: 'P-2844', age: 29, glucose: 88, bmi: 21.5, risk: 'Low', score: 5 },
            { id: 'P-2843', age: 61, glucose: 165, bmi: 32.2, risk: 'High', score: 85 }
        ];

        // ============ STATE ============
        let currentPage = 'dashboard';
        let predictionValues = {
            age: 45,
            bmi: 28.5,
            glucose: 120,
            bp: 80,
            insulin: 85,
            skin: 25,
            preg: 2
        };

        // ============ INITIALIZATION ============
        document.addEventListener('DOMContentLoaded', () => {
            initializeApp();
        });

        function initializeApp() {
            setupNavigation();
            renderCharts();
            renderActivities();
            renderInsights();
            renderTimeline();
            renderPredictionsTable();
            animateStagger();
        }

        function setupNavigation() {
            document.querySelectorAll('.nav-item').forEach(item => {
                item.addEventListener('click', () => {
                    const page = item.dataset.page;
                    if (page) showPage(page);
                });
            });

            // Mobile menu
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const closeMobileNav = document.getElementById('closeMobileNav');
            const mobileNav = document.getElementById('mobileNav');

            if (mobileMenuBtn) {
                mobileMenuBtn.addEventListener('click', () => {
                    mobileNav.classList.remove('hidden');
                    mobileNav.classList.add('flex');
                });
            }

            if (closeMobileNav) {
                closeMobileNav.addEventListener('click', () => {
                    mobileNav.classList.add('hidden');
                    mobileNav.classList.remove('flex');
                });
            }
        }

        function showPage(pageId) {
            currentPage = pageId;

            // Update nav
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.toggle('active', item.dataset.page === pageId);
            });

            // Update pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });

            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
            }

            // Close mobile nav
            const mobileNav = document.getElementById('mobileNav');
            if (mobileNav) {
                mobileNav.classList.add('hidden');
                mobileNav.classList.remove('flex');
            }

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Re-animate stagger items
            setTimeout(animateStagger, 100);
        }

        // ============ CHARTS ============
        function renderCharts() {
            renderGlucoseLineChart();
            renderGlucoseBarChart();
            renderBMILineChart();
            renderBPChart();
            renderActivityChart();
        }

        function renderGlucoseLineChart() {
            const container = document.getElementById('glucoseChart');
            if (!container) return;

            const width = container.offsetWidth || 400;
            const height = 180;
            const data = healthData.glucoseHistory;
            const maxVal = Math.max(...data) + 10;
            const minVal = Math.min(...data) - 10;
            const range = maxVal - minVal;

            const points = data.map((val, i) => {
                const x = (i / (data.length - 1)) * width;
                const y = height - ((val - minVal) / range) * height;
                return `${x},${y}`;
            }).join(' ');

            const areaPoints = `0,${height} ${points} ${width},${height}`;

            const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

            container.innerHTML = `
                <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="glucoseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="rgba(0, 229, 191, 0.3)"/>
                            <stop offset="100%" stop-color="rgba(0, 229, 191, 0)"/>
                        </linearGradient>
                    </defs>
                    <polygon points="${areaPoints}" fill="url(#glucoseGrad)"/>
                    <polyline points="${points}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    ${data.map((val, i) => {
                        const x = (i / (data.length - 1)) * width;
                        const y = height - ((val - minVal) / range) * height;
                        return `<circle cx="${x}" cy="${y}" r="4" fill="var(--accent)" class="hover:r-6 transition-all"/>`;
                    }).join('')}
                </svg>
                <div class="flex justify-between text-xs text-[var(--muted)] mt-2">
                    ${labels.map(l => `<span>${l}</span>`).join('')}
                </div>
            `;
        }

        function renderGlucoseBarChart() {
            const container = document.getElementById('glucoseBarChart');
            if (!container) return;

            const data = healthData.glucoseHistory;
            const maxVal = Math.max(...data);
            const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

            container.innerHTML = data.map((val, i) => `
                <div class="bar" style="height: ${(val / maxVal) * 100}%">
                    <span class="bar-label">${labels[i]}</span>
                </div>
            `).join('');
        }

        function renderBMILineChart() {
            const container = document.getElementById('bmiLineChart');
            if (!container) return;

            const width = container.offsetWidth || 400;
            const height = 180;
            const data = healthData.bmiHistory;
            const maxVal = Math.max(...data) + 1;
            const minVal = Math.min(...data) - 1;
            const range = maxVal - minVal;

            const points = data.map((val, i) => {
                const x = (i / (data.length - 1)) * width;
                const y = height - ((val - minVal) / range) * height;
                return `${x},${y}`;
            }).join(' ');

            container.innerHTML = `
                <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
                    <polyline points="${points}" fill="none" stroke="var(--secondary)" stroke-width="2" stroke-linecap="round"/>
                    ${data.map((val, i) => {
                        const x = (i / (data.length - 1)) * width;
                        const y = height - ((val - minVal) / range) * height;
                        return `<circle cx="${x}" cy="${y}" r="3" fill="var(--secondary)"/>`;
                    }).join('')}
                </svg>
            `;
        }

        function renderBPChart() {
            const container = document.getElementById('bpChart');
            if (!container) return;

            const width = container.offsetWidth || 400;
            const height = 180;
            const data = healthData.bpHistory;
            const systolicData = data.map(d => d.systolic);
            const diastolicData = data.map(d => d.diastolic);
            const maxVal = Math.max(...systolicData) + 10;
            const minVal = Math.min(...diastolicData) - 10;
            const range = maxVal - minVal;

            const systolicPoints = systolicData.map((val, i) => {
                const x = (i / (systolicData.length - 1)) * width;
                const y = height - ((val - minVal) / range) * height;
                return `${x},${y}`;
            }).join(' ');

            const diastolicPoints = diastolicData.map((val, i) => {
                const x = (i / (diastolicData.length - 1)) * width;
                const y = height - ((val - minVal) / range) * height;
                return `${x},${y}`;
            }).join(' ');

            container.innerHTML = `
                <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
                    <polyline points="${systolicPoints}" fill="none" stroke="var(--danger)" stroke-width="2"/>
                    <polyline points="${diastolicPoints}" fill="none" stroke="var(--secondary)" stroke-width="2"/>
                </svg>
                <div class="flex gap-4 mt-2 text-xs">
                    <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-[var(--danger)]"></span> Systolic</span>
                    <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-[var(--secondary)]"></span> Diastolic</span>
                </div>
            `;
        }

        function renderActivityChart() {
            const container = document.getElementById('activityChart');
            if (!container) return;

            const data = healthData.activityMinutes;
            const maxVal = Math.max(...data);
            const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

            container.innerHTML = data.map((val, i) => `
                <div class="bar" style="height: ${(val / maxVal) * 100}%; background: linear-gradient(to top, var(--tertiary), var(--secondary));">
                    <span class="bar-label">${labels[i]}</span>
                </div>
            `).join('');
        }

        // ============ RENDER FUNCTIONS ============
        function renderActivities() {
            const container = document.getElementById('recentActivities');
            if (!container) return;

            const icons = {
                checkup: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
                glucose: '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/>',
                prediction: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
                exercise: '<path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>',
                medication: '<path d="M10.5 20H4a2 2 0 01-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 011.66.9l.82 1.2a2 2 0 001.66.9H20a2 2 0 012 2v3"/>'
            };

            const statusColors = {
                success: 'var(--success)',
                normal: 'var(--accent)',
                info: 'var(--secondary)'
            };

            container.innerHTML = recentActivities.map(activity => `
                <div class="flex items-center gap-4 p-3 rounded-lg hover:bg-[var(--card-hover)] transition-colors">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background: ${statusColors[activity.status]}20">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${statusColors[activity.status]}" stroke-width="2">
                            ${icons[activity.type]}
                        </svg>
                    </div>
                    <div class="flex-1">
                        <p class="font-medium">${activity.title}</p>
                        <p class="text-sm text-[var(--muted)]">${activity.desc}</p>
                    </div>
                    <span class="text-xs text-[var(--muted)]">${activity.time}</span>
                </div>
            `).join('');
        }

        function renderInsights() {
            const container = document.getElementById('priorityInsights');
            if (!container) return;

            const icons = {
                activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
                target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
                moon: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>'
            };

            container.innerHTML = priorityInsights.map(insight => `
                <div class="glass-card p-5 hover:border-[var(--accent)] transition-all cursor-pointer">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background: ${insight.color}20">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${insight.color}" stroke-width="2">
                                ${icons[insight.icon]}
                            </svg>
                        </div>
                        <span class="text-xs font-medium px-2 py-1 rounded-full" style="background: ${insight.color}20; color: ${insight.color}">
                            ${insight.priority.toUpperCase()} PRIORITY
                        </span>
                    </div>
                    <h4 class="font-semibold mb-2">${insight.title}</h4>
                    <p class="text-sm text-[var(--muted)]">${insight.desc}</p>
                </div>
            `).join('');

            // Detailed recommendations
            const detailedContainer = document.getElementById('detailedRecommendations');
            if (detailedContainer) {
                detailedContainer.innerHTML = detailedRecommendations.map(rec => `
                    <div class="flex items-start gap-4 p-4 rounded-lg bg-[var(--bg-secondary)]">
                        <div class="w-10 h-10 rounded-lg bg-[var(--accent-dim)] flex items-center justify-center shrink-0">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2">
                                <polyline points="9 11 12 14 22 4"/>
                                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                            </svg>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-xs text-[var(--accent)]">${rec.category}</span>
                                <span class="text-xs px-2 py-0.5 rounded-full bg-[var(--success)]20 text-[var(--success)]">${rec.impact} Impact</span>
                                <span class="text-xs px-2 py-0.5 rounded-full bg-[var(--secondary)]20 text-[var(--secondary)]">${rec.effort}</span>
                            </div>
                            <h4 class="font-medium mb-1">${rec.title}</h4>
                            <p class="text-sm text-[var(--muted)]">${rec.desc}</p>
                        </div>
                    </div>
                `).join('');
            }
        }

        function renderTimeline() {
            const container = document.getElementById('healthTimeline');
            if (!container) return;

            const statusColors = {
                start: 'var(--muted)',
                milestone: 'var(--secondary)',
                progress: 'var(--warning)',
                achievement: 'var(--success)',
                current: 'var(--accent)'
            };

            container.innerHTML = healthTimeline.map(item => `
                <div class="flex gap-4 pl-8 relative">
                    <div class="absolute left-0 w-8 h-8 rounded-full flex items-center justify-center" style="background: ${statusColors[item.status]}20">
                        <div class="w-3 h-3 rounded-full" style="background: ${statusColors[item.status]}"></div>
                    </div>
                    <div class="pb-6">
                        <p class="text-xs text-[var(--muted)] mb-1">${item.date}</p>
                        <h4 class="font-medium mb-1">${item.title}</h4>
                        <p class="text-sm text-[var(--muted)]">${item.desc}</p>
                    </div>
                </div>
            `).join('');
        }

        function renderPredictionsTable() {
            const container = document.getElementById('predictionsTable');
            if (!container) return;

            container.innerHTML = predictionsData.map(pred => `
                <tr class="border-t border-[var(--border)] hover:bg-[var(--card-hover)]">
                    <td class="py-3 font-medium">${pred.id}</td>
                    <td class="py-3">${pred.age}</td>
                    <td class="py-3">${pred.glucose} mg/dL</td>
                    <td class="py-3">${pred.bmi}</td>
                    <td class="py-3">
                        <span class="px-2 py-1 rounded-full text-xs font-medium ${
                            pred.risk === 'High' ? 'bg-[rgba(239,68,68,0.15)] text-[var(--danger)]' :
                            pred.risk === 'Medium' ? 'bg-[rgba(245,158,11,0.15)] text-[var(--warning)]' :
                            'bg-[rgba(16,185,129,0.15)] text-[var(--success)]'
                        }">${pred.risk}</span>
                    </td>
                    <td class="py-3">${pred.score}%</td>
                    <td class="py-3">
                        <button class="p-2 hover:bg-[var(--bg-secondary)] rounded-lg" aria-label="View details">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                    </td>
                </tr>
            `).join('');
        }

        // ============ PREDICTION ============
        function updateSlider(type) {
            const input = document.getElementById(`${type}Input`);
            const display = document.getElementById(`${type}Value`);
            if (input && display) {
                display.textContent = input.value;
                predictionValues[type] = parseFloat(input.value);
            }
        }

        function runPrediction() {
            const placeholder = document.getElementById('resultsPlaceholder');
            const content = document.getElementById('resultsContent');
            const explanationSection = document.getElementById('explanationSection');

            placeholder.classList.add('hidden');
            content.classList.remove('hidden');
            explanationSection.classList.remove('hidden');

            // Calculate risk (simplified model for demo)
            let riskScore = 0;
            riskScore += (predictionValues.age > 45 ? 15 : predictionValues.age > 35 ? 8 : 0);
            riskScore += (predictionValues.bmi > 30 ? 20 : predictionValues.bmi > 25 ? 10 : 0);
            riskScore += (predictionValues.glucose > 140 ? 25 : predictionValues.glucose > 100 ? 12 : 0);
            riskScore += (predictionValues.bp > 90 ? 10 : predictionValues.bp > 80 ? 5 : 0);
            riskScore += (predictionValues.insulin > 150 ? 15 : predictionValues.insulin > 100 ? 8 : 0);

            const familyHistory = document.querySelector('input[name="family"]:checked');
            if (familyHistory && familyHistory.value === 'yes') {
                riskScore += 15;
            }

            riskScore = Math.min(riskScore, 95);
            riskScore = Math.max(riskScore, 5);

            // Update gauge needle (-90deg to 90deg maps to 0% to 100%)
            const rotation = -90 + (riskScore * 1.8);
            document.getElementById('riskNeedle').style.setProperty('--rotation', `${rotation}deg`);

            // Update labels
            let riskLabel, riskPercent, riskMessage, riskColor;
            if (riskScore < 30) {
                riskLabel = 'Low Risk';
                riskColor = 'var(--success)';
                riskMessage = 'Your risk profile is low. Continue maintaining healthy habits.';
            } else if (riskScore < 60) {
                riskLabel = 'Moderate Risk';
                riskColor = 'var(--warning)';
                riskMessage = 'Some risk factors detected. Consider lifestyle modifications.';
            } else {
                riskLabel = 'High Risk';
                riskColor = 'var(--danger)';
                riskMessage = 'Elevated risk detected. Consult a healthcare professional.';
            }

            document.getElementById('riskLabel').textContent = riskLabel;
            document.getElementById('riskLabel').style.color = riskColor;
            document.getElementById('riskPercent').textContent = `${riskScore}% probability`;
            document.getElementById('riskMessage').innerHTML = `<p class="text-sm">${riskMessage}</p>`;
            document.getElementById('riskMessage').style.background = `${riskColor}15`;

            // Feature importance
            renderFeatureImportance(riskScore);
        }

        function renderFeatureImportance(riskScore) {
            const container = document.getElementById('featureImportance');
            if (!container) return;

            const features = [
                { name: 'Glucose Level', value: predictionValues.glucose, impact: predictionValues.glucose > 140 ? 'High' : predictionValues.glucose > 100 ? 'Medium' : 'Low', importance: Math.min(100, predictionValues.glucose / 2) },
                { name: 'BMI', value: predictionValues.bmi, impact: predictionValues.bmi > 30 ? 'High' : predictionValues.bmi > 25 ? 'Medium' : 'Low', importance: predictionValues.bmi * 2 },
                { name: 'Age', value: predictionValues.age, impact: predictionValues.age > 50 ? 'High' : predictionValues.age > 40 ? 'Medium' : 'Low', importance: predictionValues.age },
                { name: 'Blood Pressure', value: predictionValues.bp + ' mmHg', impact: predictionValues.bp > 90 ? 'High' : predictionValues.bp > 80 ? 'Medium' : 'Low', importance: predictionValues.bp },
                { name: 'Insulin Level', value: predictionValues.insulin, impact: predictionValues.insulin > 150 ? 'High' : predictionValues.insulin > 100 ? 'Medium' : 'Low', importance: predictionValues.insulin / 3 }
            ];

            const impactColors = {
                High: 'var(--danger)',
                Medium: 'var(--warning)',
                Low: 'var(--success)'
            };

            container.innerHTML = features.map(f => `
                <div class="flex items-center gap-4">
                    <div class="w-32 text-sm text-[var(--muted)]">${f.name}</div>
                    <div class="flex-1">
                        <div class="feature-bar">
                            <div class="feature-fill" style="width: ${f.importance}%; background: ${impactColors[f.impact]}"></div>
                        </div>
                    </div>
                    <div class="w-20 text-right">
                        <span class="text-xs px-2 py-1 rounded-full" style="background: ${impactColors[f.impact]}20; color: ${impactColors[f.impact]}">${f.impact}</span>
                    </div>
                </div>
            `).join('');
        }

        function showExplanation() {
            const section = document.getElementById('explanationSection');
            section.scrollIntoView({ behavior: 'smooth' });
        }

        // ============ UTILITIES ============
        function exportPDF() {
            window.print();
        }

        function animateStagger() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        const delay = entry.target.style.getPropertyValue('--delay') || 0;
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, delay * 100);
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.stagger').forEach(item => {
                item.classList.remove('visible');
                observer.observe(item);
            });
        }
